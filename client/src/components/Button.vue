<template>
  <button
    class="btn"
    :type="$attrs.type || 'button'"
    :class="{
      [`btn--${variant}`]: !!variant,
    }"
    v-on="{ ...$listeners }"
  >
    <slot></slot>
  </button>
</template>

<script>
const STYLES = ["warning", "danger", "success"];

export { STYLES };
export default {
  props: {
    variant: {
      type: String,
      validator: (v) => STYLES.includes(v),
    },
  },
};
</script>

<style lang="scss">
.btn {
  background-color: transparent;
  position: relative;
  border-radius: $base-radius;
  border: $btn-border-width solid $btn-border-color;
  color: $btn-color;
  min-width: 35px;
  margin-left: $base-offset;

  &--danger {
    border-color: $danger-color;
    color: $danger-color;
  }

  &--warning {
    border-color: $warning-color;
    color: $warning-color;
  }

  &--success {
    border-color: $success-color;
    color: $success-color;
  }
}
</style>
