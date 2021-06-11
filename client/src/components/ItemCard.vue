<template>
  <div
    class="inventory-item"
    :class="{
      shake: shake,
    }"
  >
    <div
      class="inventory-item__name"
      :class="{
        invalid: $errors.name,
      }"
    >
      <input
        ref="name-input"
        type="text"
        v-model="local.name"
        :disabled="mode === 'show'"
        :placeholder="mode === 'show' ? 'No Name' : 'Type name'"
      />

      <small class="error-msg">expects not to be empty!</small>
    </div>

    <div
      v-if="mode !== 'create'"
      class="inventory-item__quantity"
      :class="{
        invalid: $errors.quantity,
      }"
    >
      <input
        type="number"
        v-model.number="local.quantity"
        :disabled="mode === 'show'"
        placeholder="Type quantity"
      />

      <small class="error-msg">expects a positive integer!</small>
    </div>

    <div class="inventory-item__controls">
      <template v-if="mode === 'create'">
        <btn
          class="btn--save"
          title="Save"
          variant="success"
          :disabled="interactionInProgress"
          @click="save"
        >
          <spinner variant="success" :flag="!loaded.create" />
          <font-awesome-icon v-if="loaded.create" icon="check" />
        </btn>

        <btn
          class="btn--edit"
          title="Discard"
          variant="danger"
          :disabled="interactionInProgress"
          @click="reset"
        >
          <font-awesome-icon icon="undo" />
        </btn>
      </template>

      <template v-else-if="mode === 'show'">
        <btn
          class="btn--edit"
          title="Edit"
          :disabled="interactionInProgress"
          @click="toggleMode('edit')"
        >
          <font-awesome-icon icon="edit" />
        </btn>

        <btn
          class="btn--remove"
          title="Remove"
          variant="danger"
          :disabled="interactionInProgress"
          @click="remove"
        >
          <spinner variant="danger" :flag="!loaded.remove" />
          <font-awesome-icon v-if="loaded.remove" icon="times" />
        </btn>
      </template>

      <template v-else-if="mode === 'edit'">
        <btn
          v-if="mode === 'edit'"
          class="btn--apply"
          title="Apply"
          variant="success"
          :disabled="interactionInProgress"
          @click="update"
        >
          <spinner variant="success" :flag="!loaded.update" />
          <font-awesome-icon v-if="loaded.update" icon="check" />
        </btn>

        <btn
          key="discard"
          class="btn--edit"
          title="Discard"
          variant="danger"
          :disabled="interactionInProgress"
          @click="
            toggleMode('show');
            reset(item);
          "
        >
          <font-awesome-icon icon="undo" />
        </btn>
      </template>
    </div>
  </div>
</template>

<script>
import _isEqual from "lodash.isequal";
import defaultItem from "@/config/default-item.js";

import { reactive, ref, computed, watch } from "@vue/composition-api";
import useFlag from "@/use/requestLoadingFlag";
import useStore from "@/use/store";

import Spinner from "@/components/Spinner";
import Btn from "@/components/Button";

export default {
  components: {
    Spinner,
    Btn,
  },
  setup(props, ctx) {
    const store = useStore(ctx);
    const mode = ref(props.state);
    const local = ref(defaultItem(props.item));
    const $errors = reactive({ name: false, quantity: false });
    const shake = ref(false);

    const { loaded: create, promise: dispatchCreate } = useFlag(
      store.dispatch.bind(null, "ADD")
    );
    const { loaded: update, promise: dispatchUpdate } = useFlag(
      store.dispatch.bind(null, "UPDATE")
    );
    const { loaded: remove, promise: dispatchRemove } = useFlag(
      store.dispatch.bind(null, "REMOVE")
    );
    const loaded = reactive({
      create,
      update,
      remove,
    });
    const interactionInProgress = computed(() =>
      Object.keys(loaded).some((action) => !loaded[action])
    );

    watch(
      () => props.item,
      (value) => (local.value = { ...value })
    );

    return {
      loaded,
      dispatchCreate,
      dispatchUpdate,
      dispatchRemove,
      interactionInProgress,
      defaultItem: () => reactive(defaultItem(props.item)),
      local,
      mode,
      $errors,
      shake,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    state: {
      type: String,
      validator: (value) => ["show", "create", "edit"].includes(value),
      default: "show",
    },
  },
  methods: {
    async save() {
      if (this.isInvalid()) return;
      const id = await this.dispatchCreate(this.local.name);
      this.$emit("save", id);
      this.reset();
    },
    async remove() {
      await this.dispatchRemove(this.local);
      this.$emit("remove", this.local.id);
    },
    async update() {
      if (this.isInvalid()) return;

      if (!_isEqual(this.item, this.local)) {
        this.local = await this.dispatchUpdate(this.local);
        this.$emit("update", this.local.id);
      }
      this.toggleMode("show", this.local.id);
    },
    toggleMode(mode, id = this.local.id) {
      this.mode = mode;
      this.$emit("update:mode", { mode, id });
    },
    reset(to = null) {
      this.local = this.defaultItem(to);
      this.$errors = {
        name: false,
        quantity: false,
      };
      this.$emit("reset");
    },
    shakeItem() {
      this.shake = true;
      setTimeout(() => (this.shake = false), 1000);
    },
    isInvalid() {
      this.$errors.name = !this.local.name;
      if (this.mode === "edit")
        this.$errors.quantity =
          ["", null, undefined].includes(this.local.quantity) ||
          this.local.quantity < 0;

      const error = this.$errors.name || this.$errors.quantity;
      if (error) this.shakeItem();
      return error;
    },
  },
};
</script>

<style lang="scss">
.inventory-item {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background-color: #fff;
  border-radius: $base-radius;
  padding: 5px $base-offset * 2;
  min-height: 83px;

  &__quantity {
    margin-left: 10px;
    display: inline-flex;
    align-items: baseline;
    margin-right: $base-offset;

    input {
      text-align: right;
    }
  }

  &__quantity,
  &__name {
    display: flex;
    flex-direction: column;
  }

  &__name {
    flex: 2;
  }

  &__quantity {
    flex: 1;
  }

  &__controls {
    align-self: center;
  }

  &.shake {
    animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .error-msg {
    opacity: 0;
    color: $danger-color;
    transition: opacity $transition;
    pointer-events: none;
  }

  .invalid {
    input {
      border-color: $danger-color;
    }

    .error-msg {
      opacity: 1;
      pointer-events: all;
    }
  }

  & + & {
    margin-top: $base-offset;
  }
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
