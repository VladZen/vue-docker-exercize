import { useActions } from "vuex-composition-helpers/dist";
import { onMounted, ref } from "@vue/composition-api";
import useFlag from "@/use/requestLoadingFlag";
import useRoute from "@/use/route";
import useRouter from "@/use/router";

export default function (ctx) {
  const route = useRoute(ctx);
  const router = useRouter(ctx);
  const { GET_ITEM: getItem } = useActions(["GET_ITEM"]);
  const { loaded, promise: fetchItem } = useFlag(getItem);
  const item = ref({});

  onMounted(async () => {
    try {
      item.value = await fetchItem(route.params.id);
    } catch (e) {
      router.replace("/");
    }
  });

  return {
    itemLoaded: loaded,
    item,
  };
}
