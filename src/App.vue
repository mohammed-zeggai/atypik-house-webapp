<template>
  <Header />

  <!-- Ici on affiche le 'route' actuel -->
  <router-view />

  <footer>
    <p id="footer-text">&copy; ZEGGAI Mohammed - 2022</p>
  </footer>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
body {
  background-color: #f2f6fc;
  color: #69707a;
}

#footer-text {
    text-align: center;
}

.badgeBtn {
  cursor: pointer;
}
</style>
