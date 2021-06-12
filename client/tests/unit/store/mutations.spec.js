import { mutations } from "@/store/mutations";
import { state } from "@/store/state";

const testMutations = (mutationType, payload, assertionFn, customState) => {
  const localState = customState || state();
  mutations[mutationType](localState, payload);
  assertionFn(localState);
};

describe("Store mutations", () => {
  it("initializeList", () => {
    const payload = global.generateList(3);

    testMutations("initializeList", payload, (localState) => {
      expect(localState.list).toEqual(payload);
    });
  });

  it("updateItem", () => {
    const list = global.generateList(3);
    const payload = {
      id: "2",
      name: "New Name",
      quantity: 11,
    };

    testMutations(
      "updateItem",
      payload,
      (localState) => {
        expect(localState.list.length).toBe(3);
        expect(localState.list[1]).toEqual(payload);
      },
      {
        list,
      }
    );
  });

  it("addItem", () => {
    const list = global.generateList(3);
    const payload = {
      id: "5",
      name: "New Name",
      quantity: 11,
    };

    testMutations(
      "addItem",
      payload,
      (localState) => {
        expect(localState.list.length).toBe(4);
      },
      {
        list,
      }
    );
  });

  it("removeItem", () => {
    const list = global.generateList(3);
    const payload = "2";

    testMutations(
      "removeItem",
      payload,
      (localState) => {
        expect(localState.list.length).toBe(2);
      },
      {
        list,
      }
    );
  });

  it("setMerchantName", () => {
    const payload = "Some Name";

    testMutations("setMerchantName", payload, (localState) => {
      expect(localState.merchantName).toBe(payload);
    });
  });

  it("setOrder", () => {
    const payload = {
      column: "quantity",
      direction: "desc",
    };

    testMutations("setOrder", payload, (localState) => {
      expect(localState.orderBy).toEqual(payload);
    });
  });
});
