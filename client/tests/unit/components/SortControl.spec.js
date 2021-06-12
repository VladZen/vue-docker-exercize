import { createLocalVue, mount } from "@vue/test-utils";
import SortControl from "@/components/SortControl";
import Vuex from "vuex";
import { mutations } from "@/store/mutations";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  state: () => ({ orderBy: { column: "name", direction: "asc" } }),
  mutations: {
    setOrder: mutations.setOrder,
  },
});

const mountSortControl = () => mount(SortControl, { localVue, store });

describe("SortControl", () => {
  let wrapper;

  const select = () => wrapper.find(".sort-control__select");

  beforeAll(() => {
    wrapper = mountSortControl();
  });

  it("checks basic rendering", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("checks manipulations with the select", async () => {
    const options = select().findAll("option");
    await options.at(1).setSelected();
    expect(wrapper).toMatchSnapshot();
  });
});
