const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    },
    {
        path: "/login",
        name: "Login",
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    },
    {
        path: "/signup",
        name: "SignUp",
        component: () => import(/* webpackChunkName: "signup" */ '@/views/SignUp.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
        meta: {
            title: '關於我們',
            auth: true,
        },
    },
    {
        path: '/upload',
        name: 'Upload',
        component: () => import(/* webpackChunkName: "upload" */ '@/views/Upload.vue'),
        meta: {
            title: '錄音上傳',
            auth: true,
        },
    },
    {
        path: '/list',
        name: 'List',
        component: () => import(/* webpackChunkName: "list" */ '@/views/List.vue'),
        meta: {
            title: '錄音列表',
            auth: true,
        },
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
        meta: {
            title: '設定',
            auth: true,
        },
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
        component: () => import(/* webpackChunkName: "personal" */ '@/views/Personal.vue'),
        meta: {
            title: '個人資料',
            // auth: true,
        },
    },
    {
        path: '/asr',
        name: 'ASR',
        component: () => import(/* webpackChunkName: "asr" */ '@/views/ASR.vue'),
        meta: {
            title: '語音AI對話',
            auth: true,
        },
    },
    {
        path: "/callback",
        name: "Callback",
        component: () => import(/* webpackChunkName: "callback" */ '@/views/Callback.vue'),
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/",
    },
]

export default routes;
