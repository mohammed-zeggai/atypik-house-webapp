<template>
  <section class="py-5 text-center container">
    {{ location.id }} <br />
    {{ location.titre }} <br />
    {{ location.description }} <br />
    {{ location.prix }} <br />
    <img
      src="https://pastel-immo.fr/wp-content/uploads/2019/11/11-Les-diffe%CC%81rents-types-dagence-immobilie%CC%80re.jpg"
    /><br />
    {{ location.prix }} <br />

    <hr />

    <ol>
      <h4>Commentaires</h4>

      <li v-for="comment in locationComments" :key="comment.id">
        <strong>{{ comment.user.nom }} {{ comment.user.prenom }}</strong
        >, le {{ new Date(comment.date_ajout).toLocaleDateString() }}: <br />
        {{ comment.commentaire }}
      </li>
    </ol>
  </section>
</template>

<script>
export default {
  name: "LocationDetail",

  data() {
    return {
      id: null,
      location: {},
      locationComments: [],
    };
  },

  mounted() {
    // Récupérer l'id depuis l'url
    this.id = this.$route.params.id;

    // Récupérer les informations du backend
    fetch("http://localhost:8080/api/location/" + this.id)
      .then((response) => response.json())
      .then((data) => {
        this.location = data;
        this.getLocationComments();
      });
  },

  methods: {
    getLocationComments() {
      // Récupérer les informations du backend
      fetch(
        "http://localhost:8080/api/commentaire/location/" + this.location.id
      )
        .then((response) => response.json())
        .then((data) => {
          this.locationComments = data;
        });
    },
  },
};
</script>
