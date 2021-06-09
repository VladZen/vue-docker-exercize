<template>
  <div
    v-if="flag"
    class="spinner"
    :class="{
      [`spinner--${variant}`]: !!variant,
    }"
  >
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>

<script>
const STYLES = ["warning", "danger", "success"];

export default {
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      validator: (v) => STYLES.includes(v),
    },
  },
};
</script>

<style lang="scss">
.spinner {
  text-align: center;

  & > div {
    background-color: $text-color;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  &--danger {
    & > div {
      background-color: $danger-color;
    }
  }

  &--warning {
    & > div {
      background-color: $warning-color;
    }
  }

  &--success {
    & > div {
      background-color: $success-color;
    }
  }
}
</style>

<style lang="scss">
.btn > .spinner {
  & > div {
    width: 10px;
    height: 10px;
  }
}
</style>
