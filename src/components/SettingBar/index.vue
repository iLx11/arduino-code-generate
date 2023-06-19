<template>
<div id="bar-side">
  <div id="list-choose">
    <ul>
      <li>
        <router-link to="/esp32">
          ESP32
        </router-link>
      </li>
      <li>
        <router-link to="/esp8266">
        ESP8266
        </router-link>
      </li>
    </ul>
  </div>
  <div id="list-display">
    <router-view />
  </div>
</div>
</template>
<script  setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, watch } from 'vue'


</script>
<style lang="scss" scope>
#bar-side {
  width: 40%;
  height: 100%;
}
#list-choose {
  width: 100%;
  height: 5%;
  background: white;
  ul {
    width: 100%;
    height: 150%;
    display: flex;
    flex-flow: row nowrap;
    background: rgba(251, 237, 242, 1);
    border-radius: 20px 20px 0 0;
    li {
      width: 50%;
      height: 100%;
      a{
        width: 100%;
        height: 100%;
        font-size: 20px;
      }
    }
    li:active {
      border-top: 1px solid rgba(51,51,51, 0.8);
    }
  }
}
#list-display {
  width: 100%;
  height: 95%;
}
</style>