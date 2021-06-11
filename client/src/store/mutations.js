const mutations = {
  initializeList(state, list) {
    state.list = [].concat(list);
  },
  updateItem(state, item) {
    state.list = state.list.map((listItem) =>
      item.id === listItem.id ? item : listItem
    );
  },
  addItem(state, item) {
    state.list.unshift(item);
  },
  removeItem(state, itemId) {
    state.list = state.list.filter(({ id }) => id !== itemId);
  },
  setMerchantName(state, merchantName) {
    state.merchantName = merchantName;
  },
  setOrder(state, orderObject) {
    state.orderBy = {
      ...state.orderBy,
      ...orderObject,
    };
  },
};

export { mutations };
