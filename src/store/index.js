import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, { uid, displayName, photoURL, email }) {
      state.user = {
        uid,
        displayName,
        photoURL,
        email
      }
    }
  },
  actions: {
    setCurrentUser({ commit }) {
      commit(
        'SET_USER',
        firebase.auth().currentUser || { providerData: [null] }
      )
    }
  },
  modules: {}
})
