import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import VueClipboard from "vue-clipboard2";

import "v-calendar/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/css/bootstrap.min.css";
import "@/assets/plugins/select2/css/select2.min.css";
import "@/assets/plugins/fontawesome/css/fontawesome.min.css";
import "@/assets/plugins/fontawesome/css/all.min.css";
import "@/assets/css/style.css";

import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import Default from "@/layout/wrappers/defaultLayout.vue";
import Login from "@/layout/wrappers/loginLayout.vue";

const app = createApp(App);

// Use plugin defaults (optional)
app.use(setupCalendar, {});

// Use the components
app.component("VCalendar", Calendar);
app.component("VDatePicker", DatePicker);

app.component("default-layout", Default);
app.component("login-layout", Login);

app.use(BootstrapVue3);

app.use(VueClipboard);

app.use(router);
app.mount("#app");
