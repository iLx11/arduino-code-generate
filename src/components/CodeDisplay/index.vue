<template>
  <div id="code-display">
    <div id="code-display-box">
      123
    </div>
    <div id="generate-code">
      点击生成代码
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'
</script>
<style lang="scss">
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

  }
  #generate-code {
    box-shadow: 0.5px 1.5px 3.6px -10px rgba(0, 0, 0, 0.151), 2px 6px 29px -10px rgba(0, 0, 0, 0.19);
    // cursor: pointer;
    background: rgba(119, 139, 169, 0.6);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
