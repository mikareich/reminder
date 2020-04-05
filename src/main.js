import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyC9zuByT0Ft46JY-xsUNJH7vUho__gdBGk',
  authDomain: 'reminder-26b44.firebaseapp.com',
  databaseURL: 'https://reminder-26b44.firebaseio.com',
  projectId: 'reminder-26b44',
  storageBucket: 'reminder-26b44.appspot.com',
  messagingSenderId: '846833034551',
  appId: '1:846833034551:web:cf59ab2a2d6f61de19a6b2',
  measurementId: 'G-SWKW7JRPZC'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function() {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
