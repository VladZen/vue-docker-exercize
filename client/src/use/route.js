import { reactive } from "@vue/composition-api";
export default (ctx) => reactive(ctx.root.$root);
