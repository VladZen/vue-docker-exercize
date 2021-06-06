import { ref } from "@vue/composition-api";

export default function (action) {
  const loaded = ref(true);
  const promise = async (arg = undefined) => {
    loaded.value = false;
    const data = await action(arg);
    loaded.value = true;
    return data;
  };

  return {
    promise,
    loaded,
  };
}
