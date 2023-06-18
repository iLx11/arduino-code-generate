<template>
 <div id="esp8266-list">
    ESP8266分块目前还未开发，敬请期待。
  </div>
</template>
<script  setup>
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'


</script>
<style lang="scss">
#esp8266-list {
  width: 100%;
  height: 100%;
  background: rgba(249, 224, 214, 1);
  border-radius: 20px;
  overflow: scroll;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  padding: 1em;
}
#esp8266-list::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
#component-add {
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>