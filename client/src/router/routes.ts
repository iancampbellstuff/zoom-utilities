import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
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
    }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue')
    });
}

export default routes;
