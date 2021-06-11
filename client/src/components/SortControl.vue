<template>
  <div class="sort-control">
    <span>Sorted by {{ sortBy.column }}:</span>

    <select v-model="sortBy" class="sort-control__select">
      <optgroup v-for="column in sortings" :key="column" :label="column">
        <option
          v-for="direction in dirs"
          :value="{ column, direction }"
          :key="direction"
        >
          {{ direction }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      sortings: ["name", "quantity"],
      dirs: ["asc", "desc"],
    };
  },
  computed: {
    ...mapState(["orderBy"]),
    sortBy: {
      get() {
        return this.orderBy;
      },
      set(value) {
        this.setOrder(value);
      },
    },
  },
  methods: {
    ...mapMutations(["setOrder"]),
  },
};
</script>

<style lang="scss" scoped>
.sort-control {
  display: flex;
  justify-content: flex-end;
  margin-bottom: $base-offset;

  &__select {
    margin-left: $base-offset;
  }
}
</style>
