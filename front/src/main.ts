import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faSearch,
  faCheckSquare,
  faCircleExclamation,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import router from "./router";
import "@/assets/style/main.scss";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { vfmPlugin } from "vue-final-modal";

const vfm = vfmPlugin();
const pinia = createPinia();

library.add(
  faUser,
  faSearch,
  faCheckSquare,
  faCircleExclamation,
  faArrowLeft,
  faArrowRight
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .use(vfm)
  .mount("#app");
