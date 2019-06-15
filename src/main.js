// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import "vue-material-design-icons/styles.css"
import MenuIcon from "vue-material-design-icons/Menu.vue"
import ArrowUp from "vue-material-design-icons/ArrowUp.vue"
import ArrowDown from "vue-material-design-icons/ArrowDown.vue"
import SortAlphabetical from "vue-material-design-icons/SortAlphabetical.vue"
import Redo from "vue-material-design-icons/Redo.vue"



Vue.component("menu-icon", MenuIcon)
Vue.component("arrow-up-icon", ArrowUp)
Vue.component("arrow-down-icon", ArrowDown)
Vue.component("sort-alphabetical-icon", SortAlphabetical)
Vue.component("redo-icon", Redo)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
