<template>
  <div>
    <page-head>
      <span slot="buttons">
        <router-link to="/" title="Go to list" class="header__button">
          <font-awesome-icon icon="arrow-left" size="2x" />
        </router-link>
      </span>
    </page-head>

    <spinner :flag="!itemLoaded" />

    <item-card
      v-if="itemLoaded"
      state="edit"
      :item="item"
      @update:mode="goToShow"
    />
  </div>
</template>

<script>
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
  methods: {
    goToShow({ id }) {
      this.$router.push(`/show/${id}`);
    },
  },
};
</script>
