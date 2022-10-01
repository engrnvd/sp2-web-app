import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './U/u-core.scss'
import U from './U'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(U)

app.mount('#app')
