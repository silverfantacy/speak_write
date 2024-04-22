const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/Privacy.vue'),
        meta: {
            title: '隱私政策',
        },
    },
    {
        path: '/personal',
        name: 'Personal',
        component: () => import(/* webpackChunkName: "personal" */ '@/views/user/Personal.vue'),
        meta: {
            title: '個人資料',
            // auth: true,
        },
    },
    {
        path: "/callback",
        name: "Callback",
        component: () => import(/* webpackChunkName: "callback" */ '@/views/user/Callback.vue'),
    },
]

export default routes;
