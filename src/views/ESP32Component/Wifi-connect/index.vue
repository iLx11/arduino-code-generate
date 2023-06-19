<template>
  <div id="wifi-box">
    <div class="wifi-inp-box" v-for="v in wifiList" :key="v.id">
      <span>第{{ v.id }} 个 wifi</span>
      <input type="text" placeholder="wifi名" />
      <input type="text" placeholder="wifi密码">
    </div>
    <div id="add-wifi">添加一个wifi</div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch, readonly } from 'vue'
const wifiList = reactive([
  {
    id: 1,
    name: '',
    password: ''
  }
])
</script>
<style lang="scss">
#wifi-box {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 1em;
  margin: 1em 0;
}
.wifi-inp-box {
  width: 100%;
  height: 150px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 30px 50px 50px;
  row-gap: 10px;
  // box-shadow: 0 0 0 0.1px rgba($color: #000000, $alpha: 1.0);
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    border: none;
    text-align: center;
    // font-size: 20px;
    background: rgba(235, 238, 242, 1);
    border-radius: 12px;
  }
}
#add-wifi {
  width: 100%;
  height: 50px;
  box-shadow: 0.5px 1.5px 3.6px -10px rgba(0, 0, 0, 0.151), 2px 6px 29px -10px rgba(0, 0, 0, 0.19);
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-top: 1em;
}
</style>
