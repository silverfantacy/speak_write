import { defineStore } from 'pinia';

export const useGlobalStore = defineStore({
    id: 'global',
    state: () => ({
        isLoading: false,
    }),
    actions: {
        setLoading(value) {
            this.isLoading = value;
        },
    },
});
