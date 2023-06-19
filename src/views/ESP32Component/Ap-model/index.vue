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
