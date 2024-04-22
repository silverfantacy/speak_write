import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from '@/stores'
import '@/assets/tailwind.css'
import { initFlowbite } from 'flowbite'
import Swal from "sweetalert2";
import moment from "moment";
import 'moment/dist/locale/zh-tw'
moment.locale('zh-tw')

const app = createApp(App)

app.config.globalProperties.$filters = {
    currencydecimal(value) {
        return value.toFixed(2)
    },
    currencyinteger(value) {
        return value.toFixed(0)
    },
    datetime(value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    date(value) {
        return moment(value).format('YYYY-MM-DD')
    },
    time(value) {
        return moment(value).format('HH:mm:ss')
    },
}


import { createLogto } from '@logto/vue';

const config = {
    endpoint: import.meta.env.VITE_LOGTO_END_POINT,
    appId: import.meta.env.VITE_LOGTO_APP_ID,
};

app
    .use(createLogto, config)
    .use(router)
    .use(pinia)
    .use(initFlowbite)
    .mount('#app')
