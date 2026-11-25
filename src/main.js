import { createApp } from "vue";
import { createPinia } from "pinia";
import BootstrapVue3 from "bootstrap-vue-3";
import VueDatePicker from "@vuepic/vue-datepicker";
import { LoadingPlugin } from "vue-loading-overlay";
import App from "./App.vue";
import router from "./router";

// CSS của thư viện trước, CSS của dự án sau cùng để giao diện (theme.css) luôn ghi đè được
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "@vuepic/vue-datepicker/dist/main.css";
import "vue-loading-overlay/dist/css/index.css";
import "@/assets/css/bootstrap.min.css";
import "@/assets/plugins/select2/css/select2.min.css";
import "@/assets/plugins/fontawesome/css/fontawesome.min.css";
import "@/assets/plugins/fontawesome/css/all.min.css";
import "@/assets/css/style.css";
import "@/assets/css/theme.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(BootstrapVue3);
app.use(LoadingPlugin);
app.component("VueDatePicker", VueDatePicker);

app.mount("#app");
