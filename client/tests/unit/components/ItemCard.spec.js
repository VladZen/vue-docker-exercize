import { mount, createLocalVue } from "@vue/test-utils";
import ItemCard from "@/components/ItemCard";
import Vuex from "vuex";
import defaultItem from "@/config/default-item";

const localVue = createLocalVue();
localVue.use(Vuex);

const SAVE_ID = "1";
const SAVE_NAME = "New Item";
const ABSTRACT_QUANTITY = 30;
const EXISTING_ITEM = defaultItem({
  id: SAVE_ID,
  name: SAVE_NAME,
  quantity: ABSTRACT_QUANTITY,
});

const store = new Vuex.Store({
  actions: {
    ADD: () => SAVE_ID,
    UPDATE: (store, payload) => payload,
    REMOVE: (store, { id }) => id,
  },
});

const mountItemCard = (propsData = {}) => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  return mount(ItemCard, {
    store,
    localVue,
    propsData,
    attachTo: div,
    stubs: {
      "font-awesome-icon": true,
    },
  });
};

describe("ItemCard", () => {
  let wrapper;
  const getButtons = () => wrapper.findAll(".inventory-item__controls .btn");

  it.each(["show", "create", "edit"])(
    'checks "%s" basic rendering',
    (state) => {
      if (["show", "edit"].includes(state)) {
        expect(mountItemCard({ state, item: EXISTING_ITEM })).toMatchSnapshot();
      } else {
        expect(mountItemCard({ state: "create" })).toMatchSnapshot();
      }
    }
  );

  describe("create", () => {
    beforeEach(() => (wrapper = mountItemCard({ state: "create" })));
    afterEach(() => wrapper.destroy());

    describe("should properly handle save", () => {
      it("when input data is invalid", async () => {
        const btn = getButtons().at(0);
        await wrapper.setData({
          local: {
            name: "",
          },
        });

        await btn.trigger("click");
        expect(wrapper.emitted().save).toBeFalsy();
        expect(wrapper).toMatchSnapshot();
      });

      it("when input data is valid", async () => {
        const btn = getButtons().at(0);
        await wrapper.setData({
          local: {
            name: SAVE_NAME,
          },
        });

        await btn.trigger("click");
        await global.timeout(1);
        expect(wrapper.emitted().save[0][0]).toBe(SAVE_ID);
      });
    });

    it("should properly handle discard", async () => {
      const btn = getButtons().at(1);
      await btn.trigger("click");
      expect(wrapper.emitted().reset).toBeTruthy();
    });
  });

  describe("edit", () => {
    beforeEach(
      () => (wrapper = mountItemCard({ state: "edit", item: EXISTING_ITEM }))
    );
    afterEach(() => wrapper.destroy());

    describe("should properly handle update", () => {
      const btn = () => getButtons().at(0);

      it("when input data is invalid", async () => {
        await wrapper.setData({
          local: {
            name: "",
            quantity: "",
          },
        });

        await btn().trigger("click");
        expect(wrapper.emitted().update).toBeFalsy();
        expect(wrapper.emitted()["update:mode"]).toBeFalsy();
        expect(wrapper).toMatchSnapshot();
      });

      it("when data has not been changed", async () => {
        await btn().trigger("click");
        expect(wrapper.emitted().update).toBeFalsy();
        expect(wrapper.emitted()["update:mode"][0][0]).toEqual({
          mode: "show",
          id: SAVE_ID,
        });
        expect(wrapper).toMatchSnapshot();
      });

      it("when data has been changed and valid", async () => {
        const newData = {
          id: SAVE_ID,
          name: "Item Changed",
          quantity: 50,
        };

        await wrapper.setData({ local: newData });

        await btn().trigger("click");
        await global.timeout(1);
        expect(wrapper.emitted().update[0][0]).toBe(SAVE_ID);
        expect(wrapper.emitted()["update:mode"][0][0]).toEqual({
          mode: "show",
          id: SAVE_ID,
        });
        expect(wrapper).toMatchSnapshot();
      });
    });

    it("should properly handle discard", async () => {
      const btn = getButtons().at(1);
      const newData = {
        id: SAVE_ID,
        name: "Item Changed",
        quantity: 50,
      };
      await wrapper.setData({ local: newData });
      await btn.trigger("click");
      expect(wrapper.emitted()["update:mode"][0][0]).toEqual({
        mode: "show",
        id: SAVE_ID,
      });
      expect(wrapper.emitted().reset).toBeTruthy();
      Object.keys(wrapper.vm.$errors).forEach((key) => {
        expect(wrapper.vm.$errors[key]).toBeFalsy();
      });
      expect(wrapper.vm.local).toEqual(EXISTING_ITEM);
    });
  });

  describe("show", () => {
    beforeEach(
      () => (wrapper = mountItemCard({ state: "show", item: EXISTING_ITEM }))
    );
    afterEach(() => wrapper.destroy());

    it("should properly handle changing mode to edit", async () => {
      const btn = getButtons().at(0);
      await btn.trigger("click");
      expect(wrapper.emitted()["update:mode"][0][0]).toEqual({
        mode: "edit",
        id: SAVE_ID,
      });
    });

    it("should properly handle remove", async () => {
      const btn = getButtons().at(1);
      await btn.trigger("click");
      await global.timeout(1);
      expect(wrapper.emitted().remove[0][0]).toBe(SAVE_ID);
    });
  });
});
