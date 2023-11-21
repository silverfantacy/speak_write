import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { storeToRefs } from 'pinia';
import { useGlobalStore, useAuthStore } from "@/stores";
import { useLogto } from "@logto/vue";
import routes from "./routes.js";
import tools from "./tools.js";

const router = createRouter({
    history: createWebHistory(),
    // history: createWebHashHistory(),
    routes: [
        ...routes,
        ...tools,
        {
            path: "/:catchAll(.*)",
            redirect: "/",
        },
    ],
    scrollBehavior() {
        return {
            el: '#app',
            top: 0,
        };
    }
});

router.beforeEach(async (to, from, next) => {
    const globalStore = useGlobalStore();
    globalStore.setLoading(true);
    const { isAuthenticated } = useLogto();

    if (to.matched.some(record => record.meta.auth) && !isAuthenticated.value) {
        return next({ name: 'Personal' });
    }

    return next();
});

router.afterEach((to, from) => {
    const title = to.meta.title;
    window.document.title = title ? `${title} | SpeakWrite` : 'SpeakWrite';

    const globalStore = useGlobalStore();
    setTimeout(() => {
        globalStore.setLoading(false);
    }, 1000);
});

export default router;
