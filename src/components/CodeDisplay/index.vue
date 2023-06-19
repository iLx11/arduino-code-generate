<template>
  <div id="code-display">
    <div id="code-display-box">
      <highlightjs language="c++" :code="code" />
    </div>
    <div id="generate-code">点击生成代码</div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'

const code = ref(
  '// oled 屏初始化\nvoid oledInit() {\n  u8g2.begin();\n  u8g2.setFont(u8g2_font_unifont_t_symbols);\n  u8g2.firstPage();\n  u8g2.enableUTF8Print();                   //enable UTF8\n  u8g2.setFont(u8g2_font_wqy12_t_gb2312b);  //设置中文字符集\n}\n// oled 屏幕显示\nvoid oledShow(String content) {\n  do {\n    u8g2.clearBuffer();\n    u8g2.setCursor(0, 40);  //指定显示位置\n    u8g2.print(content);    //使用print来显示字符串\n  } while (u8g2.nextPage());\n}\n// oled 屏初始化\nvoid oledInit() {\n  u8g2.begin();\n  u8g2.setFont(u8g2_font_unifont_t_symbols);\n  u8g2.firstPage();\n  u8g2.enableUTF8Print();                   //enable UTF8\n  u8g2.setFont(u8g2_font_wqy12_t_gb2312b);  //设置中文字符集\n}\n// oled 屏幕显示\nvoid oledShow(String content) {\n  do {\n    u8g2.clearBuffer();\n    u8g2.setCursor(0, 40);  //指定显示位置\n    u8g2.print(content);    //使用print来显示字符串\n  } while (u8g2.nextPage());\n}\n// oled 屏初始化\nvoid oledInit() {\n  u8g2.begin();\n  u8g2.setFont(u8g2_font_unifont_t_symbols);\n  u8g2.firstPage();\n  u8g2.enableUTF8Print();                   //enable UTF8\n  u8g2.setFont(u8g2_font_wqy12_t_gb2312b);  //设置中文字符集\n}\n// oled 屏幕显示\nvoid oledShow(String content) {\n  do {\n    u8g2.clearBuffer();\n    u8g2.setCursor(0, 40);  //指定显示位置\n    u8g2.print(content);    //使用print来显示字符串\n  } while (u8g2.nextPage());\n}\n// oled 屏初始化\nvoid oledInit() {\n  u8g2.begin();\n  u8g2.setFont(u8g2_font_unifont_t_symbols);\n  u8g2.firstPage();\n  u8g2.enableUTF8Print();                   //enable UTF8\n  u8g2.setFont(u8g2_font_wqy12_t_gb2312b);  //设置中文字符集\n}\n// oled 屏幕显示\nvoid oledShow(String content) {\n  do {\n    u8g2.clearBuffer();\n    u8g2.setCursor(0, 40);  //指定显示位置\n    u8g2.print(content);    //使用print来显示字符串\n  } while (u8g2.nextPage());\n}\n// oled 屏初始化\nvoid oledInit() {\n  u8g2.begin();\n  u8g2.setFont(u8g2_font_unifont_t_symbols);\n  u8g2.firstPage();\n  u8g2.enableUTF8Print();                   //enable UTF8\n  u8g2.setFont(u8g2_font_wqy12_t_gb2312b);  //设置中文字符集\n}\n// oled 屏幕显示\nvoid oledShow(String content) {\n  do {\n    u8g2.clearBuffer();\n    u8g2.setCursor(0, 40);  //指定显示位置\n    u8g2.print(content);    //使用print来显示字符串\n  } while (u8g2.nextPage());\n}\n// oled 屏初始化\nvoid oledInit() {\n  u8g2.begin();\n  u8g2.setFont(u8g2_font_unifont_t_symbols);\n  u8g2.firstPage();\n  u8g2.enableUTF8Print();                   //enable UTF8\n  u8g2.setFont(u8g2_font_wqy12_t_gb2312b);  //设置中文字符集\n}\n// oled 屏幕显示\nvoid oledShow(String content) {\n  do {\n    u8g2.clearBuffer();\n    u8g2.setCursor(0, 40);  //指定显示位置\n    u8g2.print(content);    //使用print来显示字符串\n  } while (u8g2.nextPage());\n}\n// oled 屏初始化\nvoid oledInit() {\n  u8g2.begin();\n  u8g2.setFont(u8g2_font_unifont_t_symbols);\n  u8g2.firstPage();\n  u8g2.enableUTF8Print();                   //enable UTF8\n  u8g2.setFont(u8g2_font_wqy12_t_gb2312b);  //设置中文字符集\n}\n// oled 屏幕显示\nvoid oledShow(String content) {\n  do {\n    u8g2.clearBuffer();\n    u8g2.setCursor(0, 40);  //指定显示位置\n    u8g2.print(content);    //使用print来显示字符串\n  } while (u8g2.nextPage());\n}\n// oled 屏初始化\nvoid oledInit() {\n  u8g2.begin();\n  u8g2.setFont(u8g2_font_unifont_t_symbols);\n  u8g2.firstPage();\n  u8g2.enableUTF8Print();                   //enable UTF8\n  u8g2.setFont(u8g2_font_wqy12_t_gb2312b);  //设置中文字符集\n}\n// oled 屏幕显示\nvoid oledShow(String content) {\n  do {\n    u8g2.clearBuffer();\n    u8g2.setCursor(0, 40);  //指定显示位置\n    u8g2.print(content);    //使用print来显示字符串\n  } while (u8g2.nextPage());\n}\n// oled 屏初始化\nvoid oledInit() {\n  u8g2.begin();\n  u8g2.setFont(u8g2_font_unifont_t_symbols);\n  u8g2.firstPage();\n  u8g2.enableUTF8Print();                   //enable UTF8\n  u8g2.setFont(u8g2_font_wqy12_t_gb2312b);  //设置中文字符集\n}\n// oled 屏幕显示\nvoid oledShow(String content) {\n  do {\n    u8g2.clearBuffer();\n    u8g2.setCursor(0, 40);  //指定显示位置\n    u8g2.print(content);    //使用print来显示字符串\n  } while (u8g2.nextPage());\n}\n'
)
</script>
<style lang="scss">
pre {
  width: 100%;
  height: 100%;
  text-align: left !important;
  font-size: 18px;
  font-family: "ceyy" !important;
}
code {
  padding: 8em;
}
#code-display {
  width: 58%;
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 85% 12%;
  align-content: space-between;
  #code-display-box {
    box-shadow: 0.5px 1.5px 3.6px -10px rgba(0, 0, 0, 0.151), 2px 6px 29px -10px rgba(0, 0, 0, 0.19);
    border-radius: 23px;
    overflow: scroll;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }
  #code-display-box::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  #generate-code {
    box-shadow: 0.5px 1.5px 3.6px -10px rgba(0, 0, 0, 0.151), 2px 6px 29px -10px rgba(0, 0, 0, 0.19);
    // cursor: pointer;
    background: rgba(201, 209, 221, 1);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
