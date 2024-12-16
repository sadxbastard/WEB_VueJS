// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router.js'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';



const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ToastService)
app.use(PrimeVue, {
    theme:{
        preset:Aura,
        options:{
            prefix: 'p',
            darkModeSelector: 'white',
            cssLayer: false
        }
    }
})
app.mount('#app')
