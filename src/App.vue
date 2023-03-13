<template>
  <Nav></Nav>
  <router-view/>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  components: { Nav }
}
</script>
<style>
body {
  background-color: #f2f2f2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width:700px;
  margin:1% auto;
  color: #2c3e50;
}
</style>
