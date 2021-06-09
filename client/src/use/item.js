import defaultItem from "@/config/default-item";
import { reactive } from "@vue/composition-api";
export default (item) => reactive(defaultItem(item));
