<template>
  <div class="view">
    <spinner :flag="!loaded" />

    <item-card
      v-if="loaded"
      ref="itemCard"
      :item="action !== 'create' ? item : undefined"
      :mode="action !== 'create' ? action : undefined"
      @save="goTo.bind(null, 'show')"
      @update="goTo.bind(null, 'show')"
      @remove="goToList"
      @update:mode="setViewMode"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import useFlag from "@/use/requestLoadingFlag";
import ItemCard from "@/components/ItemCard";
import Spinner from "@/components/Spinner";

export default {
  components: {
    ItemCard,
    Spinner,
  },
  props: {
    action: {
      type: String,
      default: "show",
    },
  },
  setup(props, ctx) {
    if (props.action === "create") return;

    const store = ctx.root.$store;
    const route = ctx.root.$route;
    let item = ref({});

    if (["show", "edit"].includes(props.action)) {
      const { loaded, promise: fetchItem } = useFlag(
        store.dispatch.bind(null, "GET_ITEM", route.params.id)
      );
      onMounted(async () => {
        item.value = await fetchItem();
      });

      return {
        loaded,
        item,
      };
    }
  },
  methods: {
    goTo({ mode, id }) {
      this.$router.push({ path: `/${mode}/${id}` });
    },
    goToList() {
      this.$router.push({ path: "/" });
    },
    setViewMode({ mode, id }) {
      if (typeof mode === "undefined") this.goToList();
      this.goTo({ mode, id });
    },
  },
};
</script>
