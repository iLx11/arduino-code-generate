<template>
  <div id="webserver-box">
   <span>webserver</span>
   <textarea name="" id="" cols="30" rows="10" placeholder="请填写硬件服务器需要执行的业务逻辑代码，代码内容将直接放在函数体内"></textarea>
  </div>
</template>
<script  setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'
import Active from '@/interface/activeInterface'

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
defineExpose({
  webserverComp
})
</script>
<style lang="scss">
#webserver-box {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 1em;
  margin: 1em 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  grid-template-rows: 20px 200px;
  textarea {
     border: none;
    font-size: 20px;
    background: rgba(235, 238, 242, 1);
    border-radius: 12px;
    padding: 1em;
  }
}
</style>