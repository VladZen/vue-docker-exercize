<template>
  <div class="layout">
    <h1>{{ merchantName }} Inventory</h1>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  created() {
    this.fetchMerchantName();
  },
  computed: {
    ...mapState(["merchantName"]),
  },
  methods: {
    ...mapActions({
      fetchMerchantName: "GET_MERCHANT",
    }),
  },
};
</script>

<style lang="scss" src="@/assets/scss/index.scss"></style>
