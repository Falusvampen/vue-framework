import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import getViews from './router/autoRouter.js'

const app = createApp(App)
console.log(getViews())

app.use(router)

app.mount('#app')
