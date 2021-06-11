<template>
  <div>
    <page-head>
      <span slot="buttons">
        <router-link to="/" title="Go to list" class="header__button">
          <font-awesome-icon icon="arrow-left" size="2x" />
        </router-link>
      </span>
    </page-head>

    <item-card state="create" @save="goToShow" />
  </div>
</template>

<script>
import ItemCard from "@/components/ItemCard";
import PageHead from "@/components/Header";

export default {
  components: {
    ItemCard,
    PageHead,
  },
  methods: {
    goToShow(id) {
      this.$router.push(`/show/${id}`);
    },
  },
};
</script>
