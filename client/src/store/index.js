import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const _HELPERS = {
  makeFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => {
      formData.append(key, object[key]);
    });
  },
  notInList(list, item) {
    return list.some(({ id }) => item.id === id);
  },
};

export default new Vuex.Store({
  state: {
    merchantName: "",
    list: [],
  },
  mutations: {
    initializeList(state, list) {
      state.list = list;
    },
    updateItem(state, item) {
      state.list = state.list.map((listItem) =>
        item.id === listItem.id ? item : listItem
      );
    },
    removeItem(state, itemId) {
      state.list = state.list.filter(({ id }) => id !== itemId);
    },
    setMerchantName(state, merchantName) {
      state.merchantName = merchantName;
    },
  },
  actions: {
    async GET_MERCHANT({ commit }) {
      const merchantName = await axios.get("/api/merchant-name/");
      commit("setMerchantName", merchantName);
    },
    async GET_INVENTORY({ commit }) {
      const inventory = await axios.get("/api/inventory/");
      commit("initializeList", inventory);
    },
    async REMOVE({ commit, state }, item) {
      if (_HELPERS.notInList.call(null, state.list, item)) return;
      await axios.delete(`/api/inventory/${item.id}`);
      commit("removeItem", item);
    },
    async ADD({ commit }, name) {
      const formData = _HELPERS.makeFormData({ name });
      const item = await axios.post("/api/inventory/", formData);
      commit("addItem", item);
    },
    async EDIT_QUANTITY({ commit, state }, { item, quantity }) {
      if (_HELPERS.notInList.call(null, state.list, item)) return;
      const formData = _HELPERS.makeFormData({ quantity });
      const { quantity: newQuantity } = await axios.patch(
        `/api/inventory/${item.id}`,
        formData
      );
      commit("updateItem", { ...item, quantity: newQuantity });
    },
  },
});
