<template>
  <div id="udp-box">
   <span>udp</span>
   <input type="text" placeholder="UDP 远端 IP 地址" />
   <input type="text" placeholder="UDP 监听端口">
   <input type="text" placeholder="UDP 发送端口" />
  </div>
</template>
<script  setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'


</script>
<style lang="scss">
#udp-box {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 1em;
  margin: 1em 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  grid-template-rows: 20px 50px 50px 50px;
  input {
     border: none;
    text-align: center;
    font-size: 20px;
    background: rgba(235, 238, 242, 1);
    border-radius: 12px;
  }
}
</style>