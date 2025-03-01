import { createApp } from 'vue';
import App from '@/App.vue';
import { router } from '@/router';
import { pinia } from '@/pinia';
import { vuetify } from './vuetify';

createApp(App).use(router).use(pinia).use(vuetify).mount('#app');
