import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/main/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Index.vue') },
            {
                path: '/home',
                component: () => import('pages/Index.vue')
            },
            {
                path: '/passcode',
                component: () => import('pages/Passcode.vue')
            },
            {
                path: '/meetings',
                component: () => import('pages/Meetings.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

export default routes;
