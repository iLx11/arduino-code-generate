<template>
  <div id="code-display">
    <div id="code-display-box" v-copy="code">
      <highlightjs language="arduino" :code="code" v-if="codeShow"/>
    </div>
    <div id="generate-code" @click="generateCode">点击生成代码</div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useStore } from '@/stores/finalStr'
import hljs from 'highlight.js'
// 代码生成存放
const code = ref<string>('')
const codeShow = ref<Boolean>(true)
const store = useStore()
const generateCode = () => {
  store.setGenerState()
  code.value = store.finalStr
}
watch(store, () => {
  code.value = store.finalStr
}, {
  immediate: true,
  deep: true
})
// 自定义复制指令
const vCopy = {
  mounted: (el: any, { value }: any) => {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        alert('内容为空')
        return
      }
      const textarea = document.createElement('textarea')
      textarea.readOnly = 'readOnly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-6666px'
      textarea.value = el.$value
      document.body.appendChild(textarea)
      textarea.select()
      if (document.execCommand('Copy')) {
        alert('复制成功')
      }
      document.body.removeChild(textarea)
    }
    //绑定事件
    el.addEventListener('click', el.handler)
  },
  //当传进来的值更新的时候触发
  updated(el, { value }) {
    el.$value = value
  },
  //指令与元素解绑的时候
  unMounted(el) {
    el.removeEventListener('click', el.handler)
  }
}
</script>
<style lang="scss">
pre {
  width: 100%;
  height: 100%;
  text-align: left !important;
  font-size: 18px;
  font-family: "ceyy" !important;
}
code {
  padding: 8em;
}
#code-display {
  width: 58%;
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 85% 12%;
  align-content: space-between;
  #code-display-box {
    // box-shadow: 0.5px 1.5px 3.6px -10px rgba(0, 0, 0, 0.151), 2px 6px 29px -10px rgba(0, 0, 0, 0.19);
    border-radius: 22px;
    overflow: scroll;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    background: #3a404d;
  }
  #code-display-box::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  #generate-code {
    box-shadow: 0.5px 1.5px 3.6px -10px rgba(0, 0, 0, 0.151), 2px 6px 29px -10px rgba(0, 0, 0, 0.19);
    // cursor: pointer;
    background: rgba(201, 209, 221, 1);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
