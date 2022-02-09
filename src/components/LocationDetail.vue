<template>
  <section class="py-5 text container" >
    <div style="margin-top:47px">
      <div class="card card-body text-black">
        <strong> Location numéro : {{ location.id }} <br />
        {{ location.titre }}</strong> <br />
    
        <img
          :src="location.image || 'https://pastel-immo.fr/wp-content/uploads/2019/11/11-Les-diffe%CC%81rents-types-dagence-immobilie%CC%80re.jpg'" style="width: 500px"
        /><br />
    
        <p class="card-text">Description : {{ location.description }}</p>
        <p class="card-text">Équipements : {{ location.equipement }}</p>
        <strong class="card-text" style="color:green">Prix : {{ location.prix }} </strong> <br />
    </div>

    <hr />

    <h4>Avis</h4>
    <ul class="list-group">

      <li class="list-group-item" v-for="comment in locationComments" :key="comment.id">
        <strong>{{ comment.user.nom }} {{ comment.user.prenom }}</strong>,
        le {{ new Date(comment.date_ajout).toLocaleDateString("fr-FR", { month: "2-digit", day: "2-digit", year: "numeric" }) }}: <br />
        {{ comment.commentaire }}

        <span v-if="comment.user.id == reservation.user.id" @click="supprimerCommentaire(comment.id)" class="badgeBtn badge bg-danger rounded-pill">Supprimer</span>
      </li>

      <li class="list-group-item"  v-if="userConnected">
        <div v-if="commentCreated" class="alert alert-success alert-dismissible fade show" role="alert">
          Votre commentaire à été publié avec succés!
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <form @submit="submitComment">
          <textarea id="comment" type="text" style="width:1150px" v-model="comment.commentaire" required>
          </textarea><br>

          <button type="submit" class="btn btn-info">Commenter</button>
        </form>
      </li>
    </ul>
    <br>
    <router-link v-if="userConnected && comment.user.id != location.user.id" :to="`/payment/${id}`" class="btn btn-success">Réserver</router-link>
    </div>
  </section>
</template>

<script>
import { apiUrl } from '../env.js';

export default {
  name: "LocationDetail",

  data() {
    return {
      id: null,
      location: {
        user: { id: null }
      },
      locationComments: [],
      userConnected: false,
      comment: {
        user: { id: null },
        location: { id: null },
        commentaire: ''
      },
      commentCreated: false
    };
  },

  mounted() {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      this.userConnected = true;
    }

    // Récupérer l'id depuis l'url
    this.id = this.$route.params.id;

    // Récupérer les informations du backend
    fetch(`${apiUrl}/api/location/` + this.id)
    .then((response) => response.json())
    .then((data) => {
      this.location = data;
      this.getLocationComments();

      // Parametrer les requetes
      const user = JSON.parse(localStorage.getItem("user"));

      this.comment.user.id = user.id;
      this.comment.location.id = this.location.id;
    });
  },

  methods: {
    getLocationComments() {
      // Récupérer les informations du backend
      fetch(
        `${apiUrl}/api/commentaire/location/` + this.location.id
      )
      .then((response) => response.json())
      .then((data) => {
        this.locationComments = data;
      });
    },

    submitComment(ev) {
      ev.preventDefault();

      fetch(
        `${apiUrl}/api/commentaire/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(this.comment),
        }
      )
      .then((response) => response.json())
      .then((data) => {
        this.commentCreated = true;
        this.comment.commentaire = '';
        this.getLocationComments();
      });
    },
    
    supprimerCommentaire(id) {
      fetch(`${apiUrl}/api/commentaire/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => response.json())
      .then((data) => {
        alert("Commentaire supprimée!");
        this.getLocationComments();
      });
    }
  },
};
</script>
