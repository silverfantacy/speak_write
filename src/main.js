import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './tailwind.css'
import 'flowbite'
import store from './store'
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



app
  .use(router)
  .use(store)
  .mount('#app')