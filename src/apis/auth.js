import { fetchWrapper } from "../api.js";

export default {
    // register: (data) => fetchWrapper.post('/api/v1/KOL/calculator/register', data),
    // login: (email, password) => fetchWrapper.post('/api/v1/KOL/calculator/login', { email, password }),
    // checkLogin: () => fetchWrapper.post('/api/v1/KOL/calculator/checkLogin'),
    // passwordReset: (data) => fetchWrapper.post('/api/v1/KOL/calculator/passwordReset', data),
    // sendPasswordResetEmail: (email) => fetchWrapper.post('/api/v1/KOL/calculator/sendPasswordResetEmail', { email }),
    // getUserInfo: (id) => fetchWrapper.get(`${import.meta.env.VITE_LOGTO_END_POINT}/api/users/${id}`),
    getUserInfo: (id) => fetchWrapper.get(`${import.meta.env.VITE_LOGTO_END_POINT}/api/users/${id}`),
}
