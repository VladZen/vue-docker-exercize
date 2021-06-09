<template>
  <div>
    <page-head>
      <span slot="buttons">
        <button
          class="header__button"
          title="Add a new item"
          :disabled="isCreate"
          @click="toggleCreate"
        >
          <font-awesome-icon icon="plus" size="2x" />
        </button>
      </span>
    </page-head>

    <item-card
      v-if="isCreate"
      state="create"
      ref="new"
      @reset="toggleCreate(false)"
    />

    <spinner :flag="!loaded" />

    <template v-if="loaded">
      <div v-if="!list.length" class="no-items-message">
        No items in the list =(
      </div>

      <item-card ref="list" v-for="item in list" :key="item.id" :item="item" />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { onMounted, ref } from "@vue/composition-api";
import useFlag from "@/use/requestLoadingFlag";
import useStore from "@/use/store";

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
    const store = useStore(ctx);
    const isCreate = ref(false);

    const { loaded, promise: fetchInventory } = useFlag(
      store.dispatch.bind(null, "GET_INVENTORY")
    );

    onMounted(fetchInventory);

    return {
      loaded,
      isCreate,
      toggleCreate(flag = !isCreate.value) {
        isCreate.value = flag;
      },
    };
  },
  computed: {
    // Until Vue3 released as a stable version,
    // there are some issues, connected to the interaction between Vuex and Composition API Plugin for Vue2,
    // so to prevent unexpected error, it's better to declare computed props from Vuex
    // using mappers.
    ...mapState(["list", "newItemId"]),
  },
};
</script>

<style lang="scss" scoped>
.no-items-message {
  text-align: center;
  font-size: large;
  margin-top: 50px;
}
</style>
