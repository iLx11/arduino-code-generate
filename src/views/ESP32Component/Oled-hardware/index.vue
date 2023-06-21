<template>
  <div id="oled-box">
    <span>oled</span>
    <div id="oled-inp-box">
      <span>SCL</span>
      <input type="text" placeholder="SCL" />
      <span>SDA</span>
      <input type="text" placeholder="SDA" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import Active from '@/interface/activeInterface'

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
defineExpose({
  oledComp
})
</script>
<style lang="scss">
#oled-box {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 1em;
  margin: 1em 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  grid-template-rows: 20px 50px;
  #oled-inp-box {
    display: grid;
    grid-template-columns: 20% 30% 20% 30%;
    grid-auto-rows: 1fr;
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
