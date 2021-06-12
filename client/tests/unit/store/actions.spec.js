import { actions } from "@/store/actions";

const LIST = global.generateList(4);
const SAVE_ID = "6";
const MERCHANT_NAME = "Some Merchant Name";

// mocking api
const axiosMock = global.createAxiosMock();

axiosMock
  .onGet("/api/merchant-name/")
  .reply(200, MERCHANT_NAME)
  .onGet("/api/inventory/")
  .reply(200, LIST)
  .onGet("/api/inventory/1/")
  .reply(200, LIST[0])
  .onDelete("/api/inventory/2/")
  .reply(200)
  .onPost("/api/inventory/")
  .reply((config) => {
    const item = JSON.stringify(Object.fromEntries(config.data));
    return [
      200,
      {
        id: SAVE_ID,
        name: item.name,
        quantity: 0,
      },
    ];
  })
  .onPatch("/api/inventory/3/")
  .reply(200, (config) => [
    200,
    JSON.stringify(Object.fromEntries(config.data)),
  ]);

const testAction = async (
  action,
  payload,
  expectedMutations,
  expectedActions,
  done,
  storeMocks = {}
) => {
  const count = {
    mutations: 0,
    actions: 0,
  };

  // mock commit fn
  const commit = (type, payload) => {
    const mutation = expectedMutations[count.mutations];

    try {
      expect(type).toEqual(mutation.type);
      if (payload) {
        expect(payload).toEqual(payload);
      }
    } catch (error) {
      done(error);
    }

    count.mutations++;
  };

  // mock dispatch fn
  const dispatch = (type, payload) => {
    const action = expectedActions[count.actions];

    try {
      expect(type).toEqual(action.type);
      if (payload) {
        expect(payload).toEqual(action.payload);
      }
    } catch (error) {
      done(error);
    }

    count.actions++;
  };

  // call action fn
  await action(
    {
      commit,
      dispatch,
      ...storeMocks,
    },
    payload
  );
  // check if mutations and actions have been called
  expect(count.mutations).toEqual(expectedMutations.length);
  expect(count.actions).toEqual(expectedActions.length);

  done();
};

describe("Store actions", () => {
  describe("GET_MERCHANT", () => {
    it("when no merchant name", (done) => {
      testAction(
        actions.GET_MERCHANT,
        undefined,
        [
          {
            type: "setMerchantName",
            payload: MERCHANT_NAME,
          },
        ],
        [],
        done,
        {
          state: {
            merchantName: "",
          },
        }
      );
    });

    it("when merchant name exists", (done) => {
      testAction(actions.GET_MERCHANT, undefined, [], [], done, {
        state: {
          merchantName: MERCHANT_NAME,
        },
      });
    });
  });

  it("GET_INVENTORY", (done) => {
    testAction(
      actions.GET_INVENTORY,
      undefined,
      [
        {
          type: "initializeList",
          payload: LIST,
        },
      ],
      [],
      done
    );
  });

  describe("GET_ITEM", () => {
    it("exists in state", (done) => {
      testAction(actions.GET_ITEM, "1", [], [], done, {
        state: {
          list: LIST,
        },
      });
    });

    it("doesn't exist in state", (done) => {
      testAction(
        actions.GET_ITEM,
        "1",
        [
          {
            type: "addItem",
            payload: LIST[0],
          },
        ],
        [],
        done,
        {
          state: {
            list: [],
          },
        }
      );
    });
  });

  describe("REMOVE", () => {
    it("exists in state", (done) => {
      testAction(
        actions.REMOVE,
        LIST[1],
        [
          {
            type: "removeItem",
            payload: "2",
          },
        ],
        [],
        done,
        {
          state: {
            list: LIST,
          },
        }
      );
    });

    it("doesn't exist in state", (done) => {
      testAction(actions.REMOVE, LIST[0], [], [], done, {
        state: {
          list: [],
        },
      });
    });
  });

  it("ADD", (done) => {
    const name = "Some Name";
    testAction(
      actions.ADD,
      name,
      [
        {
          type: "addItem",
          payload: {
            id: SAVE_ID,
            name,
            quantity: 0,
          },
        },
      ],
      [],
      done
    );
  });

  describe("UPDATE", () => {
    it("exists in state", (done) => {
      const payload = {
        id: LIST[2].id,
        name: "New Name",
        quantity: 2,
      };

      testAction(
        actions.UPDATE,
        payload,
        [
          {
            type: "updateItem",
            payload,
          },
        ],
        [],
        done,
        {
          state: {
            list: LIST,
          },
        }
      );
    });

    it("doesn't exist in state", (done) => {
      const payload = {
        id: 50,
        name: "New Name",
        quantity: 2,
      };

      testAction(actions.UPDATE, payload, [], [], done, {
        state: {
          list: [],
        },
      });
    });
  });
});
