<template>
  <div id="esp32-list">
    <div id="component-add">添加一个组件</div>
    <WifiConnect v-if="compActive.wifiComp.isActived"/>
    <UdpContect v-if="compActive.udpComp.isActived"/>
    <MqttConnect />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'
import WifiConnect from '@/views/Wifi-connect'
import UdpContect from '@/views/Udp-contect'
import MqttConnect from '@/views/Mqtt-connect'
import Active from '@/interface/activeInterface'

// wifi 组件
/**
 * wifiMulti.addAP("lnet", "qiaokl123");
 */
const wifiComp = reactive<Active>({
  headerFile: `#include <WiFi.h>\n#include <WiFiMulti.h>\n`,
  objDef: `//wifi对象定义\nWiFiMulti wifiMulti;\n`,
  setup: `  // WIFI 初始化\n  wifiInitList();\n`,
  init: `// wifi 初始化函数\nvoid wifiInitList() {\n  {{replace}}\n  // 等待以及判断 wifi 是否已经连接成功\n  Serial.println("Connecting Wifi...");\n  while (wifiMulti.run() != WL_CONNECTED) {\n    delay(300);\n    Serial.print(".");\n  }\n  Serial.println("");\n  Serial.println("WiFi connected");\n  Serial.print("Connected to ");\n  // 连接的WiFi名称\n  Serial.println(WiFi.SSID());\n  Serial.println("IP address: ");\n  // 连接的WiFi ip 地址\n  Serial.println(WiFi.localIP());\n  // ip 地址转字符串\n  String aa = WiFi.localIP().toString().c_str();\n}\n`,
  loop: `  if (wifiMulti.run() != WL_CONNECTED) {\n    Serial.println("WiFi not connected!");\n    delay(1000);\n  }\n`,
  isActived: false
})
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
// MQTT 组件
/**
 * //MQTT定义
  const char* mqtt_server = "bemfa.com";                        //MQTT服务器IP
  const int mqttPort = 9501;                                    //MQTT服务器端口
  const char* ESP32_ID = "75ee4e39450943889749e9924e3a982c";  //自定义ID
  const char* ESP32_user = "75ee4e39450943889";               //用户名
  const char* ESP32_password = "wulianwang";                  //密码
  const char* ESP32_pub = "banzi002";                         //发送主题（对方的订阅主题）
  const char* ESP32_sub = "banzi002";                         //订阅主题（对方的发送主题）
 */
const mqttComp =reactive<Active>({
  headerFile: `#include <PubSubClient.h>\n#include <WiFiClient.h>\n`,
  objDef: `{{replace}}\nWiFiClient espClient;\nPubSubClient client(espClient);  //定义客户端对象\n`,
  setup: `  //初始化MQTT客户端\n  initMQTT();\n  //连接到指定MQTT服务器，并订阅指定主题\n  MQTTConnect();\n`, 
  init: `//MQTT部分开始\nvoid initMQTT()  //初始化MQTT设置\n{\n  //指定客户端要连接的MQTT服务器IP和端口\n  client.setServer(mqtt_server, mqttPort);\n  //绑定数据回调函数\n  client.setCallback(callback);\n}\nvoid MQTTConnect()  //连接MQTT服务器\n{\n  //用while循环执行到连接MQTT成功\n  while (!client.connected()) {\n    Serial.println("连接MQTT服务器中");\n    //连接MQTT服务器，提交ID，用户名，密码\n    bool is = client.connect(ESP32_ID, ESP32_user, ESP32_password);\n    if (is) {\n      Serial.println("连接MQTT服务器成功");\n    } else {\n      Serial.print("失败原因 ");\n      Serial.print(client.state());\n      delay(2000);\n    }\n  }\n  client.subscribe(ESP32_sub, 1);  //添加订阅\n  // client.publish(ESP32_pub, "asdfasdf");\n}\n// 数据回调函数，监听数据接收\nvoid callback(char* topic, byte* payload, unsigned int length) {\n  Serial.print("消息来自订阅主题: ");\n  Serial.println(topic);\n  Serial.print("消息:");\n  String data = "";\n  for (int i = 0; i < length; i++) {\n    data += (char)payload[i];\n  }\n  Serial.println(data);\n  Serial.println();\n  MQTT_Handler(topic, data, length);  //把接收的数据，传入处理函数执行分析处理\n}\n// 数据处理函数，执行对接收数据的分析处理\nvoid MQTT_Handler(String topic, String data, int length) {\n  if (data == "") return;\n  if (data == "on") {\n    analogWrite(2, 100);\n  } else if (data == "off") {\n    analogWrite(2, 0);\n  }\n}\n`,
  loop: `  client.loop();  //持续运行MQTT运行函数，完成接收数据和定时发送心跳包`,
  isActived: false
})
// webserver 组件
/**
 * 待完成函数
 */
const webserverComp = reactive<Active>({
  headerFile: `#include <WebServer.h>\n`,
  objDef: `// web服务器\nWebServer server(80);\n`,
  setup: `  // 请求服务器\n  serverRequest();\n`, 
  init: `// server 初始化处理请求\nvoid serverRequest() {\n  server.begin();\n  // 继电器\n  server.on("/path", function);\n  server.onNotFound(handleUserRequest);\n}\nvoid function() {\n  Serial.println("待完成函数");\n  {{replace}}\n}\n//处理用户浏览器的HTTP资源请求\n//---------------------------------------------------------------------\nvoid handleUserRequest() {\n  // 获取用户请求资源(Request Resource）\n  String reqResource = server.uri();\n  Serial.print("reqResource: ");\n  Serial.println(reqResource);\n  // 判断是否获取\n  bool fileReadOK = handleFileRead(reqResource);\n  // 如果在SPIFFS无法找到用户访问的资源，则回复404 (Not Found)\n  if (!fileReadOK) {\n    server.send(404, "text/plain", "404 Not Found");\n  }\n}\n\n//处理浏览器HTTP访问\n//---------------------------------------------------------------------\nbool handleFileRead(String resource) {\n  if (resource.endsWith("/")) {  // 如果访问地址以"/"为结尾\n    resource = "/index.html";    // 则将访问地址修改为/index.html便于SPIFFS访问\n  }\n  if (resource == "/user.json") {\n    server.send(403, "text/html", "<h1>No Access</h1>");\n  }\n  String contentType = getContentType(resource);  // 获取文件类型\n  if (SPIFFS.exists(resource)) {                  // 如果访问的文件可以在SPIFFS中找到\n    File file = SPIFFS.open(resource, "r");       // 则尝试打开该文件\n    server.streamFile(file, contentType);         // 并且将该文件返回给浏览器\n    file.close();                                 // 并且关闭文件\n    return true;                                  // 返回true\n  }\n  return false;  // 如果文件未找到，则返回false\n}\n\n// 获取文件类型\n// ---------------------------------------------------------------------\nString getContentType(String filename) {\n  if (filename.endsWith(".htm")) return "text/html";\n  else if (filename.endsWith(".html")) return "text/html";\n  else if (filename.endsWith(".css")) return "text/css";\n  else if (filename.endsWith(".js")) return "application/javascript";\n  else if (filename.endsWith(".png")) return "image/png";\n  else if (filename.endsWith(".gif")) return "image/gif";\n  else if (filename.endsWith(".jpg")) return "image/jpeg";\n  else if (filename.endsWith(".ico")) return "image/x-icon";\n  else if (filename.endsWith(".xml")) return "text/xml";\n  else if (filename.endsWith(".pdf")) return "application/x-pdf";\n  else if (filename.endsWith(".zip")) return "application/x-zip";\n  else if (filename.endsWith(".gz")) return "application/x-gzip";\n  return "text/plain";\n}\n`,
  loop: `  server.handleClient();\n`,
  isActived: false
})
// oled 组件
/**
 * #define SCL 22\n#define SDA 21
 */
const oledComp = reactive<Active>({
  headerFile: `#include <U8g2lib.h>\n`,
  objDef: `{{replace}}\n#define FORMAT_SPIFFS_IF_FAILED true\n// u8\nU8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, /*clock=*/SCL, /*data=*/SDA, /*reset=*/U8X8_PIN_NONE);\n`,
  setup: `  // oled 初始化\n  oledInit();\n`, 
  init: `// oled 屏初始化\nvoid oledInit() {\n  u8g2.begin();\n  u8g2.setFont(u8g2_font_unifont_t_symbols);\n  u8g2.firstPage();\n  u8g2.enableUTF8Print();                   //enable UTF8\n  u8g2.setFont(u8g2_font_wqy12_t_gb2312b);  //设置中文字符集\n}\n// oled 屏幕显示\nvoid oledShow(String content) {\n  do {\n    u8g2.clearBuffer();\n    u8g2.setCursor(0, 40);  //指定显示位置\n    u8g2.print(content);    //使用print来显示字符串\n  } while (u8g2.nextPage());\n}\n`,
  loop: ``,
  isActived: false
})
// 文件系统
const fileComp = reactive<Active>({
  headerFile: `// 文件系统\n#include "FS.h"\n#include "SPIFFS.h"\n`,
  objDef: ``,
  setup: `  // 文件系统初始化\n  fsInit();\n`, 
  init: `// spiffs 文件系统连接\nvoid fsInit() {\n  if (!SPIFFS.begin(FORMAT_SPIFFS_IF_FAILED)) {\n    Serial.println("SPIFFS Mount Failed.");\n    return;\n  }\n  Serial.println("SPIFFS Started.");\n}\n`,
  loop: ``,
  isActived: false
})
// 模板的总体对象
const compActive = reactive({
  wifiComp,
  udpComp,
  mqttComp,
  webserverComp,
  oledComp,
  fileComp
})
onMounted(() => {
  // console.clear()
  // printObj(compActive.webserverComp)
})
// 替换模板代码
const replaceConfig = function(template: string = '', config: string = ''): string {
  return template && template.replace(/\{\{replace\}\}/g, config);
}
// 打印对象
const printObj = function(obj: object): void {
  Object.keys(obj).forEach(o => console.log(o + ':\n' + obj[o]));
}
</script>
<style lang="scss">
#esp32-list {
  width: 100%;
  height: 100%;
  background: rgba(249, 224, 214, 1);
  border-radius: 20px;
  overflow: scroll;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  padding: 1em;
}
#esp32-list::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
#component-add {
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
