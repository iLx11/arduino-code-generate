import { defineStore } from 'pinia'

export const useStore = defineStore('finalStr', {
  state: () => ({
    finalStr: '',
    generState: 0
  }),
  actions: {
    setStr(str: string) {
      this.finalStr = str
    },
    setGenerState() {
      this.generState > 3 ? (this.generState = 0) : this.generState++
    }
  }
})
