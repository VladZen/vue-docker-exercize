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
import ItemViewMixin from "@/mixins/item-view-mixin";

export default {
  mixins: [ItemViewMixin],
  methods: {
    goToShow({ id }) {
      this.$router.push(`/show/${id}`);
    },
  },
};
</script>
