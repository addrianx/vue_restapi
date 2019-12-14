<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <PostComponent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from '../components/PostComponent.vue'

export default {
  name: 'home',
  components: {
    PostComponent
  }
}
</script>
