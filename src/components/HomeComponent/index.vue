<template>
  <div id="backg"></div>
  <div id="content">
    <SettingBar />
    <CodeDisplay />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'
import SettingBar from '@/components/SettingBar'
import CodeDisplay from '@/components/CodeDisplay'
onMounted(() => {
  // console.log(12312)
})
</script>
<style lang="scss">
#backg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(209, 220, 219, 1.0);
}
#content {
  width: 95%;
  height: 94%;
  max-width: 1400px;
  max-height: 900px;
  min-width: 1200px;
  min-height: 580px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 1.0);
  box-shadow:
    12.5px 2.8px 10px rgba(0, 0, 0, 0.028),
    100px 22px 80px rgba(0, 0, 0, 0.09);
  border-radius: 25px;
  overflow: hidden;
  padding: 2em;
}
</style>