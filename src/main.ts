import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// googlecode nord
import './assets/css/nord.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

// createApp(App).use(router).use(hljsVuePlugin).mount('#app')
const app = createApp(App)
app.use(router)
app.use(hljsVuePlugin)
app.use(createPinia())
app.mount('#app');