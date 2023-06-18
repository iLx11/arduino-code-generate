import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeComponent from '../components/HomeComponent/index.vue'
import ESP32Page from '../views/ESP32Page/index.vue'
import ESP8266Page from '../views/ESP8266Page/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent,
    redirect: '/esp32',
    children: [
      {
        path: '/esp32',
        component:  ESP32Page
      },
      {
        path: '/esp8266',
        component:  ESP8266Page
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
