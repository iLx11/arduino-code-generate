<template>
  <div id="fileSystem-box">
    <span>fileSystem</span>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'
</script>
<style lang="scss">
#fileSystem-box {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding: 1em;
  margin: 1em 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  grid-template-rows: 30px;
  justify-content: center;
  align-items: center;
}
</style>
