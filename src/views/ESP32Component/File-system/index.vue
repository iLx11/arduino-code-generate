<template>
  <div id="fileSystem-box">
    <span>fileSystem</span>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'
import Active from '@/interface/activeInterface'

// 文件系统
const fileComp = reactive<Active>({
  headerFile: `// 文件系统\n#include "FS.h"\n#include "SPIFFS.h"\n`,
  objDef: ``,
  setup: `  // 文件系统初始化\n  fsInit();\n`,
  init: `// spiffs 文件系统连接\nvoid fsInit() {\n  if (!SPIFFS.begin(FORMAT_SPIFFS_IF_FAILED)) {\n    Serial.println("SPIFFS Mount Failed.");\n    return;\n  }\n  Serial.println("SPIFFS Started.");\n}\n`,
  loop: ``,
  isActived: false
})
defineExpose({
  fileComp
})
</script>
<style lang="scss">
#fileSystem-box {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 1em;
  margin: 1em 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  grid-template-rows: 30px;
  justify-content: center;
  align-items: center;
}
</style>
