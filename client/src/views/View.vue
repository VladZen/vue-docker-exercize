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
      state="show"
      :item="item"
      @update:mode="goToEdit"
      @remove="goToList"
    />
  </div>
</template>

<script>
import ItemViewMixin from "@/mixins/item-view-mixin";

export default {
  mixins: [ItemViewMixin],
  methods: {
    goToList() {
      this.$router.push("/");
    },
    goToEdit({ id }) {
      this.$router.push(`/edit/${id}`);
    },
  },
};
</script>
