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

    <spinner :flag="!listLoaded" />

    <template v-if="listLoaded">
      <div v-if="!list.length" class="no-items-message">
        No items in the list =(
      </div>

      <item-card ref="list" v-for="item in list" :key="item.id" :item="item" />
    </template>
  </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";
import useList from "@/use/scenario/ofList";

import ItemCard from "@/components/ItemCard";
import Spinner from "@/components/Spinner";
import PageHead from "@/components/Header";

export default {
  components: {
    ItemCard,
    Spinner,
    PageHead,
  },
  setup() {
    const { list, listLoaded, isCreate, fetchInventory, toggleCreate } =
      useList();

    onMounted(async () => {
      await fetchInventory();
    });

    return {
      list,
      listLoaded,
      isCreate,
      toggleCreate,
    };
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
