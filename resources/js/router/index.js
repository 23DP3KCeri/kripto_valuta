import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Pardosana from '../components/Pardosana.vue';
import Pirksana from '../components/Pirksana.vue';
import Apmaina from '../components/Apmaina.vue';
import Vesture from '../components/Vesture.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Admin from '../components/Admin.vue';
import { useAuth } from '../composables/useAuth';

const routes = [
    { path: '/', component: Home },
    { path: '/pardosana', component: Pardosana },
    { path: '/pirksana', component: Pirksana },
    { path: '/apmaina', component: Apmaina },
    { path: '/vesture', component: Vesture },
    { path: '/login', component: Login, meta: { guest: true } },
    { path: '/register', component: Register, meta: { guest: true } },
    { path: '/admin', component: Admin, meta: { admin: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    const { user } = useAuth();
    if (!to.meta.guest && !user.value) return '/login';
    if (to.meta.guest && user.value) return '/';
    if (to.meta.admin && user.value?.role !== 'admin') return '/';
});

export default router;
