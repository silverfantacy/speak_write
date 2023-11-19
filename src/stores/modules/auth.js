import { defineStore } from 'pinia';
import router from '@/router';
import { useLogto } from "@logto/vue";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        returnUrl: null
    }),
    actions: {
        async getUserInfo() {
            const { fetchUserInfo, getAccessToken, isAuthenticated, getIdTokenClaims } = useLogto();

            if (isAuthenticated.value) {
                try {
                    this.user = await fetchUserInfo();
                    this.user.accessToken = await getAccessToken();
                    // this.user.idToken = await getIdTokenClaims();
                    return this.user;
                } catch (error) {
                    console.log(error);
                }
            }

            return null;
        },

        signIn() {
            useLogto().signIn(`${import.meta.env.VITE_APP_URL}/callback`);
        },

        signOut() {
            useLogto().signOut(import.meta.env.VITE_APP_URL);
        }
    }
});
