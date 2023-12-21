import { createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import store from './stores';
import App from './App.vue';
import router from './router';

const pinia = createPinia();
setActivePinia(pinia);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(store);
app.mount('#q-app');
