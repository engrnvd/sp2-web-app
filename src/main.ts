import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'
import U from './U'
import './U/u-core.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(U)

app.mount('#app')
