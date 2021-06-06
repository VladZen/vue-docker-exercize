<template>
  <div class="inventory-item">
    <template v-if="modeIs.create || modeIs.edit">
      <input
        type="text"
        ref="name-input"
        placeholder="Type name"
        class="inventory-item__name"
        v-model="item.name"
      />
    </template>

    <template v-if="!modeIs.create && modeIs.show">
      <router-link :to="`/show/${item.id}`" class="inventory-item__name">
        {{ item.name }}
      </router-link>
    </template>

    <input
      v-if="!modeIs.create"
      type="number"
      class="inventory-item__quantity"
      v-model.number="item.quantity"
      :disabled="modeIs.show"
    />

    <div class="list-item__controls">
      <template v-if="modeIs.create">
        <button
          type="button"
          class="btn btn-remove"
          :disabled="interactionInProgress"
          @click="save"
        >
          <spinner :flag="!loaded.create" />

          <span :class="!loaded.create ? 'hidden-text' : ''"> Save </span>
        </button>
      </template>

      <template v-else>
        <button
          type="button"
          class="btn btn-remove"
          :disabled="interactionInProgress"
          @click="remove"
        >
          <spinner :flag="!loaded.remove" />

          <span :class="!loaded.remove ? 'hidden-text' : ''"> Remove </span>
        </button>

        <button
          v-if="modeIs.show"
          type="button"
          class="btn btn-edit"
          :disabled="interactionInProgress"
          @click="toggleMode('edit')"
        >
          Edit
        </button>

        <button
          v-if="modeIs.edit"
          type="button"
          class="btn btn-apply"
          :disabled="interactionInProgress"
          @click="update"
        >
          <spinner :flag="!loaded.update" />

          <span :class="!loaded.update ? 'hidden-text' : ''"> Apply </span>
        </button>
      </template>

      <button
        v-if="modeIs.create || modeIs.edit"
        type="button"
        class="btn btn-edit"
        :disabled="interactionInProgress"
        @click="toggleMode(modeIs.edit ? 'show' : undefined)"
      >
        Discard
      </button>
    </div>
  </div>
</template>

<script>
import defaultItem from "@/config/default-item";
import useFlag from "@/use/requestLoadingFlag";
import { reactive, toRefs } from "@vue/composition-api";
import Spinner from "@/components/Spinner";

export default {
  components: {
    Spinner,
  },
  setup(props, ctx) {
    const store = ctx.root.$store;
    const { item } = toRefs(props);
    const { loaded: create, promise: dispatchCreate } = useFlag(
      store.dispatch.bind(null, "ADD")
    );
    const { loaded: update, promise: dispatchUpdate } = useFlag(
      store.dispatch.bind(null, "UPDATE")
    );
    const { loaded: remove, promise: dispatchRemove } = useFlag(
      store.dispatch.bind(null, "REMOVE")
    );

    return {
      loaded: reactive({
        create,
        update,
        remove,
      }),
      dispatchCreate,
      dispatchUpdate,
      dispatchRemove,
      local: item,
    };
  },
  props: {
    item: {
      type: Object,
      default: defaultItem,
    },
    mode: {
      type: String,
      validator: (value) => ["show", "edit"].includes(value),
      default: "show",
    },
  },
  data() {
    return {
      currentMode: this.mode,
    };
  },
  computed: {
    existsInDb() {
      return !!this.item.id;
    },
    modeIs() {
      return {
        show: this.currentMode === "show",
        create: !this.existsInDb,
        edit: this.currentMode === "edit",
      };
    },
    interactionInProgress() {
      return Object.keys(this.loaded).some((action) => !this.loaded[action]);
    },
  },
  methods: {
    async save() {
      const id = await this.dispatchCreate(this.local.name);
      this.toggleMode("show");
      this.$emit("save", id);
    },
    async remove() {
      await this.dispatchRemove(this.item);
      this.$emit("remove", this.item);
    },
    async update() {
      const item = await this.dispatchUpdate(this.local);
      this.toggleMode("show");
      this.$emit("update", item);
    },
    toggleMode(mode) {
      this.currentMode = mode;
      this.$emit("update:mode", { mode, id: this.item.id });
    },
  },
};
</script>

<style module lang="scss">
@import "../assets/scss/variables";
.inventory-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: $base-radius;
  padding: 0 $base-offset * 2;
  min-height: $base-offset * 8;

  &__name {
    font-weight: 700;
    white-space: nowrap;
    padding-right: $base-offset;
  }

  &__status {
    display: inline-flex;
    align-items: baseline;
    font-size: 75%;
    min-width: 102px;
    border-radius: $base-radius * 1.5;
    background-color: $body-color;
    padding: 2px 9px;

    &__icon {
      display: inline-block;
      align-self: center;
      background-size: contain;
      width: 14px;
      height: 14px;
      margin-right: 5px;
    }
  }

  & + & {
    margin-top: $base-offset;
  }
}
</style>
