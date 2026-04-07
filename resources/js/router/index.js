import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Pardosana from '../components/Pardosana.vue';
import Pirksana from '../components/Pirksana.vue';
import Apmaina from '../components/Apmaina.vue';
import Vesture from '../components/Vesture.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/pardosana', component: Pardosana },
    { path: '/pirksana', component: Pirksana },
    { path: '/apmaina', component: Apmaina },
    { path: '/vesture', component: Vesture },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
