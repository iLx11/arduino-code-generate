<template>
  <div id="udp-box">
   <span>udp</span>
   <input type="text" placeholder="UDP 远端 IP 地址" />
   <input type="text" placeholder="UDP 监听端口">
   <input type="text" placeholder="UDP 发送端口" />
  </div>
</template>
<script  setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'
import Active from '@/interface/activeInterface'

// udp 组件
/**
 * //UDP定义远端IP
 * const char* remoteIp1 = "192.168.3.123";
 * unsigned int localUdp = 1234;    //监听端口
 * unsigned int remoteUdp = 4321;   //发送端口
 */
const udpComp = reactive<Active>({
  headerFile: `#include <WiFiUdp.h>\n`,
  objDef: `{{replace}}\nchar comPacket[255];\nWiFiUDP Udp;\n`,
  setup: `  // UDP 初始化函数\n  udpInit();\n`,
  init: `// UDP 初始化函数\nvoid udpInit() {\n  if (Udp.begin(localUdp)) Serial.println("udp begin!");\n}\n//UDP发送函数\nvoid sendBack(const char* buffer) {\n  Udp.beginPacket(remoteIp1, remoteUdp);  //配置远端ip地址和端口\n  //  Udp.write(buffer); //把数据写入发送缓冲区\n  Udp.print(buffer);\n  Udp.endPacket();  //发送数据\n}\n`,
  loop: ``,
  isActived: false
})
defineExpose({
  udpComp
})
</script>
<style lang="scss">
#udp-box {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 1em;
  margin: 1em 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  grid-template-rows: 20px 50px 50px 50px;
  input {
     border: none;
    text-align: center;
    // font-size: 20px;
    background: rgba(235, 238, 242, 1);
    border-radius: 12px;
  }
}
</style>