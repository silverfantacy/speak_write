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
            useLogto().signIn(`${window.location.origin}/callback`);
        },

        signOut() {
            useLogto().signOut(window.location.origin);
        }
    }
});
