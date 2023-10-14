import { createRouter, createWebHistory } from 'vue-router'
import store from "./store";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import(/* webpackChunkName: "signup" */ './views/SignUp.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import(/* webpackChunkName: "upload" */ './views/Upload.vue'),
    meta: {
      // requiresAuth: true,
    },
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "list" */ './views/List.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import(/* webpackChunkName: "personal" */ './views/Personal.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/asr',
    name: 'ASR',
    component: () => import(/* webpackChunkName: "asr" */ './views/ASR.vue'),
    meta: {
      title: '語音AI對話',
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // title
  if (to.meta.title) {
    document.title = to.meta.title + ' | SpeakWrite';
  } else {
    document.title = 'SpeakWrite';
  }

  // auth
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log("beforeEach: ", store.getters.getAccount);
    if (store.getters.getAccount) {
      console.log("Account: ", store.getters.getAccount);
      next();
      return;
    } else {
      router.push({ name: 'Login', query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router
