import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

import router from './router';
createApp(App).use(router).use(VCalendar).mount('#app');
