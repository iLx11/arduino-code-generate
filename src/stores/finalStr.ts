import { defineStore } from "pinia";

export const useStore = defineStore('finalStr', {
  state: () => ({
    finalStr: ''
  }),
  actions: {
    setStr(str: string) {
      this.finalStr = str
    }
  }
})