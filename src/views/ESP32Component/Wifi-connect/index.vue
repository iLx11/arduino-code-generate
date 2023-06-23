<template>
  <div id="wifi-box" v-if="props.active">
    <div class="wifi-inp-box" v-for="(v, k) in wifiList" :key="v.id">
      <span>第{{ v.id }} 个 wifi</span>
      <input type="text" placeholder="wifi名" v-model="wifiList[k].name"/>
      <input type="text" placeholder="wifi密码" v-model="wifiList[k].password"/>
    </div>
    <div id="add-wifi" @click="addWifi">添加一个wifi</div>
  </div>
</template>
<script setup="props" lang="ts">
import { ref, reactive, watch } from 'vue'
import Active from '@/interface/activeInterface'

const wifiList = reactive<object[]>([
  {
    id: 1,
    name: '',
    password: ''
  }
])
const props = defineProps({
  active: Boolean
})
const addWifi = () => {
  let ids: number = wifiList.length == 0 ? 1 : wifiList[wifiList.length - 1].id + 1
  let obj: object = {
    id: ids,
    name: '',
    password: ''
  }
  wifiList.push(obj)
}
const returnStr = ():string => wifiList.reduce((pre,cur) => pre + `  wifiMulti.addAP("${cur.name}", "${cur.password}");\n`, ``)
// const replaceStr = ref<string>('');
// wifi 组件
/**
 * wifiMulti.addAP("lnet", "qiaokl123");
 */
const wifiComp = reactive<Active>({
  headerFile: `#include <WiFi.h>\n#include <WiFiMulti.h>\n`,
  objDef: `//wifi对象定义\nWiFiMulti wifiMulti;\n`,
  setup: `  // WIFI 初始化\n  wifiInitList();\n`,
  init: `// wifi 初始化函数\nvoid wifiInitList() {\n{{replace}}  // 等待以及判断 wifi 是否已经连接成功\n  Serial.println("Connecting Wifi...");\n  while (wifiMulti.run() != WL_CONNECTED) {\n    delay(300);\n    Serial.print(".");\n  }\n  Serial.println("");\n  Serial.println("WiFi connected");\n  Serial.print("Connected to ");\n  // 连接的WiFi名称\n  Serial.println(WiFi.SSID());\n  Serial.println("IP address: ");\n  // 连接的WiFi ip 地址\n  Serial.println(WiFi.localIP());\n  // ip 地址转字符串\n  String aa = WiFi.localIP().toString().c_str();\n}\n`,
  loop: `  if (wifiMulti.run() != WL_CONNECTED) {\n    Serial.println("WiFi not connected!");\n    delay(1000);\n  }\n`,
  isActived: props.active,
  configStr: ``
})
defineExpose({
  wifiComp
})
watch(() => props.active, () => {
  wifiComp.isActived = props.active
}, {
  immediate: true,
  deep: true
})
watch(wifiList, () => {
  wifiComp.configStr = returnStr()
}, {
  immediate: true,
  deep: true
})
</script>
<style lang="scss">
#wifi-box {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 1em;
  margin: 1em 0;
}
.wifi-inp-box {
  width: 100%;
  height: 150px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 30px 50px 50px;
  row-gap: 10px;
  // box-shadow: 0 0 0 0.1px rgba($color: #000000, $alpha: 1.0);
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    border: none;
    text-align: center;
    // font-size: 20px;
    background: rgba(235, 238, 242, 1);
    border-radius: 12px;
  }
}
#add-wifi {
  width: 100%;
  height: 50px;
  box-shadow: 0.5px 1.5px 3.6px -10px rgba(0, 0, 0, 0.151), 2px 6px 29px -10px rgba(0, 0, 0, 0.19);
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-top: 1em;
}
</style>
