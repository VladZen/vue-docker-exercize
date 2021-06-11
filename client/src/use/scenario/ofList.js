import { ref } from "@vue/composition-api";
import { useGetters, useActions } from "vuex-composition-helpers/dist";
import useFlag from "@/use/requestLoadingFlag";

export default function () {
  const isCreate = ref(false);
  const { GET_INVENTORY: getInventory } = useActions(["GET_INVENTORY"]);
  const { sortedList } = useGetters(["sortedList"]);
  const { loaded, promise: fetchInventory } = useFlag(getInventory);

  return {
    list: sortedList,
    listLoaded: loaded,
    isCreate,
    fetchInventory,
    toggleCreate: (flag = !isCreate.value) => (isCreate.value = flag),
  };
}
