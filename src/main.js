import Axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';

Axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
Axios.defaults.headers.post['test'] = 'Header test';

createApp(App).mount('#app');