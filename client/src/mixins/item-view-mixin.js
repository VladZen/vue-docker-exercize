import useFetchItem from "@/use/scenario/ofShowOrEdit";

import ItemCard from "@/components/ItemCard";
import Spinner from "@/components/Spinner";
import PageHead from "@/components/Header";

export default {
  components: {
    ItemCard,
    Spinner,
    PageHead,
  },
  setup(props, ctx) {
    const { itemLoaded, item } = useFetchItem(ctx);
    return {
      itemLoaded,
      item,
    };
  },
};
