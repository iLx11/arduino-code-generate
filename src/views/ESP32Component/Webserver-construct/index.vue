<template>
  <div id="webserver-box">
   <span>webserver</span>
   <textarea name="" id="" cols="30" rows="10" placeholder="请填写硬件服务器需要执行的业务逻辑代码，代码内容将直接放在函数体内"></textarea>
  </div>
</template>
<script  setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'


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