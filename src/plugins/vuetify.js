// src/plugins/vuetify.js

import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { theme } from './color'

Vue.use(Vuetify)

export default new Vuetify({
  theme,
  icons: {
    iconfont: 'md'
  }
})
