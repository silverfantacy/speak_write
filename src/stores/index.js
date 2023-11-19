import { createPinia } from "pinia";
export * from './modules/auth';
export * from './modules/global';

const pinia = createPinia();

// 修復$reset
pinia.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state));
    store.$reset = () => {
        store.$patch(initialState);
    }
})

export default pinia;
