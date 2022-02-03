<template>
  <Header />
  

  <!-- Ici on affiche le 'route' actuel -->
  <router-view />

  <Footer />
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
};
</script>
