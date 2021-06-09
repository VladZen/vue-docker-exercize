<template>
  <div class="layout__header">
    <div v-if="$slots.buttons" class="header__btns">
      <slot name="buttons"></slot>
    </div>

    <h1>{{ merchantName }}<br />Inventory</h1>
    <slot></slot>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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

<style lang="scss" scoped></style>
