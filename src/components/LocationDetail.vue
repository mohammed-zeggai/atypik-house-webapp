<template>
  <section class="py-5 text-center container">
    Id: {{ location.id }} <br/>
    Titre: {{ location.titre }}
  </section>
</template>

<script>
export default {
  name: 'LocationDetail',

  data() {
    return {
      id: null,
      location: {}
    }
  },

  mounted() {
    // Récupérer l'id depuis l'url
    this.id = this.$route.params.id;

    // Récupérer les informations du backend
    fetch('http://localhost:8080/api/location/' + this.id)
    .then(response => response.json())
    .then(data => {
      this.location = data;
    });
  }
}
</script>
