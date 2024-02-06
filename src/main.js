import { createApp  } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import '@/assets/css/bootstrap.min.css';
import '@/assets/plugins/select2/css/select2.min.css';
import '@/assets/plugins/fontawesome/css/fontawesome.min.css';
import '@/assets/plugins/fontawesome/css/all.min.css';
import '@/assets/css/style.css';

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const app = createApp(App);

app.use(BootstrapVue3);

app.use(router);
app.mount('#app');