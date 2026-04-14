import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Pardosana from '../components/Pardosana.vue';
import Pirksana from '../components/Pirksana.vue';
import Apmaina from '../components/Apmaina.vue';
import Vesture from '../components/Vesture.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Admin from '../components/Admin.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';
import Profile from '../components/Profile.vue';
import { useAuth, authReady } from '../composables/useAuth';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About, meta: { public: true } },
    { path: '/contact', component: Contact, meta: { public: true } },
    { path: '/pardosana', component: Pardosana },
    { path: '/pirksana', component: Pirksana },
    { path: '/apmaina', component: Apmaina },
    { path: '/vesture', component: Vesture },
    { path: '/login', component: Login, meta: { guest: true } },
    { path: '/register', component: Register, meta: { guest: true } },
    { path: '/admin', component: Admin, meta: { admin: true } },
    { path: '/profile', component: Profile },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    await authReady;
    const { user } = useAuth();
    if (!to.meta.guest && !to.meta.public && !user.value) return '/login';
    if (to.meta.guest && user.value) return '/';
    if (to.meta.admin && user.value?.role !== 'admin') return '/';
});

export default router;
