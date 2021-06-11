import _sortBy from "lodash.orderby";

const getters = {
  sortedList({ list, orderBy: { direction, column } }) {
    return _sortBy(list, [column], [direction]);
  },
};

export { getters };
