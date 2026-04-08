import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import App from './components/App.vue';
import router from './router';
import { fetchUser } from './composables/useAuth';

const vuetify = createVuetify({
    components,
    directives,
});

fetchUser().finally(() => {
    createApp(App).use(router).use(vuetify).mount('#app');
});
