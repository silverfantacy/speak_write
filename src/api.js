import { useAuthStore } from './stores';


/**
 * Create a wrapper for making HTTP requests.
 */
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

/**
 * Create an HTTP request with the specified method.
 *
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
 * @returns {Function} A function for making the HTTP request.
 */
function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        let baseUrl = import.meta.env.VITE_API_URL;
        // 如果 url 是完整網址就直接使用，不要組合 baseUrl
        if (url.startsWith("http://") || url.startsWith("https://")) {
          baseUrl = "";
        }
        return fetch(`${baseUrl + url}`, requestOptions).then(handleResponse);
    };
}

/**
 * Generate the authorization header.
 *
 * @param {string} url - The URL of the request.
 * @returns {Object} The authorization header object.
 */
function authHeader(url) {
    const autStore = useAuthStore();
    console.log('authHeader sub',autStore.user.sub);
    console.log('authHeader accessToken', autStore.user.accessToken);
    // const isLoggedIn = !!autStore.jwt?.token;
    // const isApiUrl = url.startsWith("/api/v1/KOL/calculator/");
    if (autStore.user.accessToken) {
        return { Authorization: `Bearer ${autStore.user.accessToken}` };
    } else {
        return {};
    }
}

/**
 * Handle the HTTP response.
 *
 * @param {Response} response - The HTTP response.
 * @returns {Promise<any>} A Promise that resolves with the response data or rejects with an error.
 */
function handleResponse(response) {
    return response.text().then(text => {
        if (!response.ok) {
            const { jwt, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && jwt) {
                logout();
            }
            const error = (text && JSON.parse(text).message) || response.statusText;
            return Promise.reject(error);
        }
        return text ? JSON.parse(text) : null;
    });
}
