<template>
  <Header />

  <!-- Ici on affiche le 'route' actuel -->
  <router-view/>

  <footer>
    <p>&copy; ZEGGAI Mohammed - 2022</p>
  </footer>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style scoped>
p {
  text-align: center;
}  
</style>
