import { mount, createLocalVue } from "@vue/test-utils";
import Header from "@/components/Header";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

const MERCHANT_NAME = "Some Merchant Name";

const store = new Vuex.Store({
  state: () => ({ merchantName: "" }),
  actions: {
    GET_MERCHANT({ state }) {
      state.merchantName = MERCHANT_NAME;
    },
  },
});

const mountHeader = (buttons = "") => {
  return mount(Header, {
    store,
    localVue,
    slots: {
      buttons,
    },
  });
};

describe("Header", () => {
  it("should call fetchMerchantName on initialize", () => {
    const wrapper = mountHeader();
    expect(wrapper.vm.merchantName).toBe(MERCHANT_NAME);
  });

  it("checks rendering without buttons", () => {
    const wrapper = mountHeader();
    expect(wrapper).toMatchSnapshot();
  });

  it("checks rendering with buttons", () => {
    const wrapper = mountHeader(`<button type="button">Some Button</button>`);
    expect(wrapper).toMatchSnapshot();
  });
});
