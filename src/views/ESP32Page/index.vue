<template>
  <div id="esp32-list">
    <div id="component-add" @click="addComponent">添加一个组件</div>
    <div id="component-list" v-if="compListShow">
      <ul>
        <li v-for="(v, k) in compList" :key="v.name" @click="changeListShow(k)" :class="{ actived: v.isActived }">
          <div>{{ v.name }}</div>
        </li>
      </ul>
    </div>
    <div id="component-box" @click="test">
      <WifiConnect ref="wifiRef" :active="compList[0].isActived" />
      <UdpContect ref="udpRef" :active="compList[1].isActived" />
      <WebserverComp ref="webserverRef" :active="compList[2].isActived" />
      <OledHardware ref="oledRef" :active="compList[3].isActived" />
      <MqttConnect ref="mqttRef" :active="compList[4].isActived" />
      <FileSystem ref="fileRef" :active="compList[5].isActived" />
      <ApModel ref="apRef" :active="compList[6].isActived" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'
import WifiConnect from '@/views/ESP32Component/Wifi-connect'
import UdpContect from '@/views/ESP32Component/Udp-contect'
import MqttConnect from '@/views/ESP32Component/Mqtt-connect'
import WebserverComp from '@/views/ESP32Component/Webserver-construct'
import OledHardware from '@/views/ESP32Component/Oled-hardware'
import FileSystem from '@/views/ESP32Component/File-system'
import ApModel from '@/views/ESP32Component/Ap-model'
import Active from '@/interface/activeInterface'
import { useStore } from '@/stores/finalStr'
import { useRoute } from 'vue-router'
onMounted(() => {
  // console.clear()
})
const store = useStore()
const compList = reactive<object[]>([
  { name: 'WIFI', isActived: false },
  { name: 'UDP', isActived: false },
  { name: 'Webserver', isActived: false },
  { name: 'OLED', isActived: false },
  { name: 'MQTT', isActived: false },
  { name: '文件系统', isActived: false },
  { name: 'AP模式', isActived: false }
])
// 列表显示
const compListShow = ref<boolean>(true)
// 更改列表显示
const changeListShow = (k: number) => {
  compList[k].isActived = compList[k].isActived ? false : true
}
// 测试
const test = (): void => {
  const wifiC = wifiRef.value && wifiRef.value.wifiComp
  const udpC = udpRef.value && udpRef.value.udpComp
  const webserverC = webserverRef.value && webserverRef.value.webserverComp
  const oledC = oledRef.value && oledRef.value.oledComp
  const mqttC = mqttRef.value && mqttRef.value.mqttComp
  const fileC = fileRef.value && fileRef.value.fileComp
  const apC = apRef.value && apRef.value.APComp
  // 引用组件的对象
  const compObjArray = reactive<object[]>([wifiC, udpC, webserverC, oledC, mqttC, fileC])
  // 最后字符串的对象
  const finalObj = compObjArray
    .filter((o) => o.isActived)
    .reduce((pre, cur) => {
      pre.headerFile += replaceConfig(cur.headerFile, cur.configStr)
      pre.obj += replaceConfig(cur.objDef, cur.configStr)
      pre.setup += replaceConfig(cur.setup, cur.configStr)
      pre.init += replaceConfig(cur.init, cur.configStr)
      pre.loop += replaceConfig(cur.loop, cur.configStr)
      return pre
    }, {headerFile: '', obj: '', setup: '', init: '', loop: ''})
  
  // console.log(finalObj)
  // 最终的结果字符串
  const finalStr: string = `${finalObj.headerFile}\n${finalObj.obj}\nvoid setup() {\n${finalObj.setup}}\n\nvoid loop() {\n${finalObj.loop}}\n\n${finalObj.init}`
  // console.log(replaceConfig(wifiC.init, wifiC.configStr))
  store.setStr(finalStr)
  // console.log(final)
}
// 添加组件
const addComponent = () => (compListShow.value = compListShow.value ? false : true)
// 替换模板代码
const replaceConfig = function (template: string = '', config: string = '', second: boolean = false, secondConfig: string = ''): string {
  if (second) return template && template.replace(/\{\{replace\}\}/, config).replace(/\{\{replace1\}\}/, secondConfig)
  return template && template.replace(/\{\{replace\}\}/, config)
}
// 打印对象
const printObj = function (obj: object): void {
  Object.keys(obj).forEach((o) => console.log(o + ':\n' + obj[o]))
}
// wifi 组件
const wifiRef = ref<HTMLElement | null>(null)
// udp 组件
const udpRef = ref<HTMLElement | null>(null)
// MQTT 组件
const mqttRef = ref<HTMLElement | null>(null)
// webserver 组件
const webserverRef = ref<HTMLElement | null>(null)
// oled 组件
const oledRef = ref<HTMLElement | null>(null)
// 文件系统
const fileRef = ref<HTMLElement | null>(null)
// AP 模式
const apRef = ref<HTMLElement | null>(null)
</script>
<style lang="scss">
.actived {
  border: 0.3px solid rgba(51, 51, 51, 0.7);
}
#esp32-list {
  width: 100%;
  height: 100%;
  background: rgba(249, 224, 214, 1);
  border-radius: 20px;
  padding: 1em;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 40px auto;
  row-gap: 5px;
}
#component-box::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
#component-box {
  overflow: scroll;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
#component-add {
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0.5px 1.5px 3.6px -10px rgba(0, 0, 0, 0.151), 2px 6px 29px -10px rgba(0, 0, 0, 0.19);
  cursor: pointer;
  background: rgba(212, 111, 88, 1);
}
#component-list {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 0.3em;
  margin: 0.5em 0;
  ul {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 45px;
    row-gap: 8px;
    column-gap: 8px;
    padding: 0.6em;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0.5px 1.5px 3.6px -10px rgba(0, 0, 0, 0.151), 2px 6px 29px -10px rgba(0, 0, 0, 0.19);
      border-radius: 12px;
      cursor: pointer;
    }
  }
}
</style>
