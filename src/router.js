import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import TypesOfActivity from '@/components/TypesOfActivity.vue';
import Activities from '@/components/Activities.vue';
import CreateTypeOfActivity from "@/components/CreateTypeOfActivity.vue";

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
    {
        path: '/create_type_of_activity',
        component: CreateTypeOfActivity,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;