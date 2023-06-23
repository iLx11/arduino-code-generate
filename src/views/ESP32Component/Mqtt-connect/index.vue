<template>
  <div id="mqtt-box" v-if="props.active">
    <span>mqtt</span>
    <div id="mqtt-inp-box">
      <span>MQTT服务器IP</span>
      <input type="text" placeholder="MQTT服务器IP" v-model="properties.mqttServer"/>
      <span>MQTT服务器端口</span>
      <input type="text" placeholder="MQTT服务器端口" v-model="properties.mqttPort"/>
      <span>自定义ID</span>
      <input type="text" placeholder="自定义ID" v-model="properties.esp32ID"/>
      <span>用户名</span>
      <input type="text" placeholder="用户名" v-model="properties.esp32User"/>
      <span>密码</span>
      <input type="text" placeholder="密码" v-model="properties.esp32Password"/>
      <span>发送主题</span>
      <input type="text" placeholder="发送主题" v-model="properties.esp32Pub"/>
      <span>订阅主题</span>
      <input type="text" placeholder="订阅主题" v-model="properties.esp32Sub"/>
    </div>
  </div>
</template>
<script setup="props" lang="ts">
import { ref, reactive, watch } from 'vue'
import Active from '@/interface/activeInterface'

const props = defineProps({
  active: Boolean
})
const properties = reactive<object>({
  mqttServer: '',
  mqttPort: '',
  esp32ID: '',
  esp32User: '',
  esp32Password: '',
  esp32Pub: '',
  esp32Sub: ''
})
// MQTT 组件
/**
 * //MQTT定义
  const char* mqtt_server = "${properties.mqttServer}";                        //MQTT服务器IP
  const int mqttPort = ${properties.mqttPort};                                    //MQTT服务器端口
  const char* ESP32_ID = "${properties.esp32ID}";  //自定义ID
  const char* ESP32_user = "${properties.esp32User}";               //用户名
  const char* ESP32_password = "${properties.esp32Password}";                  //密码
  const char* ESP32_pub = "${properties.esp32Pub}";                         //发送主题（对方的订阅主题）
  const char* ESP32_sub = "${properties.esp32Sub}";                         //订阅主题（对方的发送主题）
 */
const mqttComp = reactive<Active>({
  headerFile: `#include <PubSubClient.h>\n#include <WiFiClient.h>\n`,
  objDef: `{{replace}}\nWiFiClient espClient;\nPubSubClient client(espClient);  //定义客户端对象\n`,
  setup: `  //初始化MQTT客户端\n  initMQTT();\n  //连接到指定MQTT服务器，并订阅指定主题\n  MQTTConnect();\n`,
  init: `//MQTT部分开始\nvoid initMQTT()  //初始化MQTT设置\n{\n  //指定客户端要连接的MQTT服务器IP和端口\n  client.setServer(mqtt_server, mqttPort);\n  //绑定数据回调函数\n  client.setCallback(callback);\n}\nvoid MQTTConnect()  //连接MQTT服务器\n{\n  //用while循环执行到连接MQTT成功\n  while (!client.connected()) {\n    Serial.println("连接MQTT服务器中");\n    //连接MQTT服务器，提交ID，用户名，密码\n    bool is = client.connect(ESP32_ID, ESP32_user, ESP32_password);\n    if (is) {\n      Serial.println("连接MQTT服务器成功");\n    } else {\n      Serial.print("失败原因 ");\n      Serial.print(client.state());\n      delay(2000);\n    }\n  }\n  client.subscribe(ESP32_sub, 1);  //添加订阅\n  // client.publish(ESP32_pub, "asdfasdf");\n}\n// 数据回调函数，监听数据接收\nvoid callback(char* topic, byte* payload, unsigned int length) {\n  Serial.print("消息来自订阅主题: ");\n  Serial.println(topic);\n  Serial.print("消息:");\n  String data = "";\n  for (int i = 0; i < length; i++) {\n    data += (char)payload[i];\n  }\n  Serial.println(data);\n  Serial.println();\n  MQTT_Handler(topic, data, length);  //把接收的数据，传入处理函数执行分析处理\n}\n// 数据处理函数，执行对接收数据的分析处理\nvoid MQTT_Handler(String topic, String data, int length) {\n  if (data == "") return;\n  if (data == "on") {\n    analogWrite(2, 100);\n  } else if (data == "off") {\n    analogWrite(2, 0);\n  }\n}\n`,
  loop: `  client.loop();  //持续运行MQTT运行函数，完成接收数据和定时发送心跳包`,
  isActived: false,
  configStr: ''
})
defineExpose({
  mqttComp
})
watch(() => props.active, () => {
  mqttComp.isActived = props.active
}, {immediate: true, deep: true})
watch(properties, () => {
  mqttComp.configStr = `const char* mqtt_server = "${properties.mqttServer}";                        //MQTT服务器IP\nconst int mqttPort = ${properties.mqttPort};                                    //MQTT服务器端口\nconst char* ESP32_ID = "${properties.esp32ID}";  //自定义ID\nconst char* ESP32_user = "${properties.esp32User}";               //用户名\nconst char* ESP32_password = "${properties.esp32Password}";                  //密码\nconst char* ESP32_pub = "${properties.esp32Pub}";                         //发送主题（对方的订阅主题）\nconst char* ESP32_sub = "${properties.esp32Sub}";                         //订阅主题（对方的发送主题\n`
}, {immediate: true, deep: true})
</script>
<style lang="scss">
#mqtt-box {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 1em;
  margin: 1em 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  grid-template-rows: 20px 330px;
  
  #mqtt-inp-box {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-auto-rows: 35px;
    row-gap: 12px;
  }
  input {
    border: none;
    text-align: center;
    // font-size: 20px;
    background: rgba(235, 238, 242, 1);
    border-radius: 12px;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
