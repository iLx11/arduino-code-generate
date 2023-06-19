import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// googlecode nord
import 'highlight.js/styles/nord.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

// createApp(App).use(router).use(hljsVuePlugin).mount('#app')
const app = createApp(App)
app.use(router)
app.use(hljsVuePlugin)
app.mount('#app');