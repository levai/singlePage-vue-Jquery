import Vue from 'vue'
import App from './App.vue'

import './assets/css/reset.css'
import './assets/css/app.less'

new Vue({
  el: '#app',
  render: h => h(App)
})


$('body').click(function(){
  alert(1)
})
