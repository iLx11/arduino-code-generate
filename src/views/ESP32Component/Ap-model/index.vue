<template>
  <div id="ap-box">
    <span>AP</span>
    <div id="oled-inp-box">
      <span>AP名</span>
      <input type="text" placeholder="AP名" />
      <span>AP密码</span>
      <input type="text" placeholder="AP密码" />
      <span>IP地址</span>
      <input type="text" placeholder="IP地址" />
      <span>IP网关</span>
      <input type="text" placeholder="IP网关" />
      <span>子网掩码</span>
      <input type="text" placeholder="子网掩码" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'
import Active from '@/interface/activeInterface'


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
  objDef: `//AP模式定义\n{{replace}}  //AP的密码\n`,
  setup: `  // AP 初始化\n  AP_init();\n`,
  init: `//AP 模式初始化\nvoid AP_init() {\n  {{replace1}}\n  WiFi.mode(WIFI_AP_STA);  //设置为AP模式(热点)\n  WiFi.softAPConfig(softLocal, softGateway, softSubnet);\n  WiFi.softAP(ssid, password);\n  IPAddress myIP = WiFi.softAPIP();  //用变量myIP接收AP当前的IP地址\n  Serial.println(myIP);              //打印输出myIP的IP地址\n}\n`,
  loop: ``,
  isActived: false
})
defineExpose({
  APComp
})
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
