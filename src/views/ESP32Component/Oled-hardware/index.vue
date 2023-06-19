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
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'
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
