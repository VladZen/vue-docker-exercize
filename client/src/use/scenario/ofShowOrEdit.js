import { useActions } from "vuex-composition-helpers/dist";
import useFlag from "@/use/requestLoadingFlag";

export default function () {
  const { GET_ITEM: getItem } = useActions(["GET_ITEM"]);
  const { loaded, promise: fetchItem } = useFlag(getItem);

  return {
    itemLoaded: loaded,
    fetchItem,
  };
}
