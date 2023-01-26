import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import VueApexCharts from 'vue3-apexcharts';
import router from './router';
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(App)
	.use(router)
	.use(VCalendar)
	.use(VueApexCharts)
	.use(pinia)
	.mount('#app');
