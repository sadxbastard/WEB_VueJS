import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import TypesOfActivity from '@/components/TypesOfActivity.vue';
import Activities from '@/components/Activities.vue';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/types_of_activity',
        component: TypesOfActivity,
    },
    {
        path: '/activities',
        component: Activities,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;