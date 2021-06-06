import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import defaultItem from "@/config/default-item";

Vue.use(Vuex);

const _HELPERS = {
  makeFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => {
      formData.append(key, object[key]);
    });
    return formData;
  },
  cleanData(obj) {
    return Object.keys(obj).reduce((result, key) => {
      if (typeof obj[key] !== "undefined" && obj[key] !== null) {
        result[key] = obj[key];
      }
      return result;
    }, {});
  },
  notInList(list, item) {
    return !list.some(({ id }) => item.id === id);
  },
  getFromList(list, itemId) {
    return list.find(({ id }) => itemId === id);
  },
};

export default new Vuex.Store({
  state: () => ({
    merchantName: "",
    list: [],
  }),
  mutations: {
    initializeList(state, list) {
      state.list = [].concat(list);
    },
    updateItem(state, item) {
      state.list = state.list.map((listItem) =>
        item.id === listItem.id ? item : listItem
      );
    },
    addItem(state, item = defaultItem()) {
      state.list.unshift(item);
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
      const { data: merchantName } = await axios.get("/api/merchant-name/");
      commit("setMerchantName", merchantName);
    },
    async GET_INVENTORY({ commit }) {
      const { data: inventory } = await axios.get("/api/inventory/");
      commit("initializeList", inventory);
    },
    async GET_ITEM({ commit, state }, id) {
      const item = _HELPERS.getFromList.call(null, state.list, id);
      if (item) return item;
      const { data: newItem } = await axios.get(`/api/inventory/${id}/`);
      commit("addItem", newItem);
      return newItem;
    },
    async REMOVE({ commit, state }, item) {
      if (_HELPERS.notInList.call(null, state.list, item)) return;
      await axios.delete(`/api/inventory/${item.id}/`);
      commit("removeItem", item.id);
    },
    async ADD({ commit }, name) {
      const formData = _HELPERS.makeFormData({ name });
      const item = await axios.post("/api/inventory/", formData);
      commit("addItem", item);
      return item.id;
    },
    async UPDATE({ commit, state }, { id, name, quantity }) {
      if (_HELPERS.notInList.call(null, state.list, { id })) return;
      const cleanData = _HELPERS.cleanData({ name, quantity });
      const formData = _HELPERS.makeFormData(cleanData);
      await axios.patch(`/api/inventory/${id}/`, formData);

      const newItem = { id, ...cleanData };
      commit("updateItem", newItem);
      return newItem;
    },
  },
});
