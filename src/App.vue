<template>
<searchBar></searchBar>
</template>

<script>
import searchBar from './components/searchBar.vue';

export default {
  name: 'App',
  components: {
    searchBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
}
</style>
