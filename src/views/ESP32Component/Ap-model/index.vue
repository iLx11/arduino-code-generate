<template>
  <div id="ap-box" v-if="props.active">
    <span>AP</span>
    <div id="oled-inp-box">
      <span>AP名</span>
      <input type="text" placeholder="AP名" v-model="properties.apName"/>
      <span>AP密码</span>
      <input type="text" placeholder="AP密码" v-model="properties.apPassword"/>
      <span>IP地址</span>
      <input type="text" placeholder="IP地址" v-model="properties.softLocal"/>
      <span>IP网关</span>
      <input type="text" placeholder="IP网关" v-model="properties.softGateway"/>
      <span>子网掩码</span>
      <input type="text" placeholder="子网掩码" v-model="properties.softSubnet"/>
    </div>
  </div>
</template>
<script setup="props" lang="ts">
import { ref, reactive, watch } from 'vue'
import Active from '@/interface/activeInterface'
import AppVue from '@/App.vue'

const props = defineProps({
  active: Boolean
})
const properties = reactive<object>({
  apName: '',
  apPassword: '',
  softLocal: '',
  softGateway: '',
  softSubnet: ''
})
// AP 模式
/**(1)
 * const char* ssid = "webcontrol";    //AP的SSID（WiFi名字）\nconst char* password = "12345678";
 * (2)
 * IPAddress softLocal(192, 168, 3, 6);    //IP地址，用以设置IP第4字段
  IPAddress softGateway(192, 168, 3, 6);  //IP网关，用以设置IP第3字段
  IPAddress softSubnet(255, 255, 255, 0); //子网掩码
 */
const APComp = reactive<Active>({
  headerFile: `#include <WiFi.h>\n`,
  objDef: `//AP模式定义\nconst char* ssid = "${properties.apName}";    //AP的SSID（WiFi名字）\nconst char* password = "${properties.apPassword}";  //AP的密码\n`,
  setup: `  // AP 初始化\n  AP_init();\n`,
  init: `//AP 模式初始化\nvoid AP_init() {\n  {{replace}}\n  WiFi.mode(WIFI_AP_STA);  //设置为AP模式(热点)\n  WiFi.softAPConfig(softLocal, softGateway, softSubnet);\n  WiFi.softAP(ssid, password);\n  IPAddress myIP = WiFi.softAPIP();  //用变量myIP接收AP当前的IP地址\n  Serial.println(myIP);              //打印输出myIP的IP地址\n}\n`,
  loop: ``,
  isActived: props.active,
  configStr: ''
})
defineExpose({
  APComp
})
watch(() => props.active, () => {
  APComp.isActived = props.active
}, {immediate: true, deep: true})
watch(properties, () => {
  APComp.objDef = `//AP模式定义\nconst char* ssid = "${properties.apName}";    //AP的SSID（WiFi名字）\nconst char* password = "${properties.apPassword}";  //AP的密码\n`
  APComp.configStr = `IPAddress softLocal(${properties.softLocal});    //IP地址，用以设置IP第4字段\n  IPAddress softGateway(${properties.softGateway});  //IP网关，用以设置IP第3字段\n  IPAddress softSubnet(${properties.softSubnet}); //子网掩码\n`
}, {immediate: true, deep: true})
</script>
<style lang="scss">
#ap-box {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 1em;
  margin: 1em 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  grid-template-rows: 20px auto;
  #oled-inp-box {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-auto-rows: 40px;
    row-gap: 10px;
    input {
      border: none;
      text-align: center;
      background: rgba(235, 238, 242, 1);
      border-radius: 12px;
      box-sizing: border-box;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
