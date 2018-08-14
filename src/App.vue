<template>
  <div id="app">
    <v-h></v-h>
    <p>2342</p>
    <img src="./assets/images/logo.png">
    <h1>{{ msg }}</h1>
    <img src="./assets/images/1.jpeg">

  </div>
</template>

<script>
import vH from './tpl/head'
export default {
  name: 'app',
  components:{
    vH
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>


<style lang="less">
// @import url('./assets/css/reset.css');
// @import url('./assets/css/app.less');

</style>
