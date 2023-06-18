<template>
  <div id="mqtt-box">
    <span>mqtt</span>
    <div id="mqtt-inp-box">
      <span>MQTT服务器IP</span>
      <input type="text" placeholder="MQTT服务器IP" />
      <span>MQTT服务器端口</span>
      <input type="text" placeholder="MQTT服务器端口" />
      <span>自定义ID</span>
      <input type="text" placeholder="自定义ID" />
      <span>用户名</span>
      <input type="text" placeholder="用户名" />
      <span>密码</span>
      <input type="text" placeholder="密码" />
      <span>发送主题</span>
      <input type="text" placeholder="发送主题" />
      <span>订阅主题</span>
      <input type="text" placeholder="订阅主题" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'
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
  grid-gap: 10px;
  grid-template-rows: 20px 330px;
  
  #mqtt-inp-box {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-auto-rows: 35px;
    grid-gap: 12px;
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
