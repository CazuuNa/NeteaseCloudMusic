import { createStore } from 'vuex'

const defaultState = {
  LoginStatus:0//0 未登录 1 登录
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  }
})
