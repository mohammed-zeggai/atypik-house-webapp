<template>
  <section class="content py-5 text-center container">
    <div class="card p-3" style="border-radius: 4px">
      <div v-if="reservations.length" class="row">
        <li
          v-for="reservation in reservations"
          :key="reservation.id"
          class="d-flex justify-content-between align-items-start listing-item"
        >
          <div class="col-md-5" >
            <div class="position-relative snipimage" >
              <img
                :src="reservation.location.image || 'https://images.pexels.com/photos/1673994/pexels-photo-1673994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'"
                class="rounded img-fluid w-100 img-responsive"
              />
              <router-link :to="'/location/' + reservation.location.id">
                {{ reservation.location.titre }}
              </router-link>
            </div>
            le
            {{
              new Date(reservation.date).toLocaleDateString("fr-FR", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })
            }}
          </div>
          
          <span
            @click="supprimerReservation(reservation.id)"
            class="badgeBtn badge bg-danger rounded-pill"
            >Supprimer</span
          >
        </li>
      </div>

      <div v-if="!reservations.length">
        Vous n'avez pas de réservations en attente.
      </div>
    </div>
  </section>
</template>

<script>
import { apiUrl } from '../env.js';

export default {
  name: "Reservations",

  data() {
    return {
      reservations: [],
      userId: null
    };
  },

  mounted() {
    if (!localStorage.getItem("user") && !localStorage.getItem("token")) {
      this.$router.push("/");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.id;

    this.getReservations();
  },

  methods: {
    supprimerReservation(id) {
      fetch(`${apiUrl}/api/reservation/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => response.json())
      .then((data) => {
        alert("Reservation supprimée !");
        this.getReservations();
      });
    },

    getReservations() {
      fetch(`${apiUrl}/api/reservation/${this.userId}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((response) => response.json())
        .then((data) => {
          this.reservations = data;
        });
    },
  },
};
</script>

