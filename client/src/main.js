import Vue from "vue";
import App from "./App.vue";

import VueCompositionAPI from "@vue/composition-api";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faArrowLeft,
  faEdit,
  faUndo,
  faCheck,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import router from "./router";
import store from "./store";

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

Vue.component("font-awesome-icon", FontAwesomeIcon);

library.add([faPlus, faArrowLeft, faEdit, faUndo, faCheck, faTimes, faTrash]);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
