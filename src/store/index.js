import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, { providerData }) {
      state.user = providerData[0]
    }
  },
  actions: {
    setCurrentUser({ commit }) {
      commit('SET_USER', firebase.auth().currentUser)
    }
  },
  modules: {}
})
