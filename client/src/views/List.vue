<template>
  <div class="list">
    <spinner :flag="!loaded" />

    <template v-if="loaded">
      <item-card
        ref="list"
        v-for="item in list"
        :key="item.id"
        :item="item"
        @discard="discard"
      />
    </template>
  </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";
import { mapState } from "vuex";
import useFlag from "@/use/requestLoadingFlag";
import ItemCard from "@/components/ItemCard";
import Spinner from "@/components/Spinner";

export default {
  components: {
    ItemCard,
    Spinner,
  },
  setup(props, ctx) {
    const store = ctx.root.$store;
    const { loaded, promise: fetchInventory } = useFlag(
      store.dispatch.bind(null, "GET_INVENTORY")
    );

    onMounted(fetchInventory);

    return {
      loaded,
      discard: () => store.commit("removeItem", null),
    };
  },
  computed: {
    // Until Vue3 released as a stable version,
    // there are some issues, connected to the interaction between Vuex and Composition API,
    // so to prevent unexpected error, it's better to declare computed props from Vuex
    // using mappers.
    ...mapState(["list"]),
  },
};
</script>
