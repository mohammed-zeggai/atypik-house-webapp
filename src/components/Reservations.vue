<template>
  <section class="py-5 text-center container">
    <ol class="list-group list-group-numbered">
      <li v-for="reservation in reservations" :key="reservation.id" class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">
            <router-link :to="'/location/' + reservation.location.id">
              {{ reservation.location.titre }}
            </router-link>
          </div>
          le {{ new Date(reservation.date).toLocaleDateString("fr-FR", { month: "2-digit", day: "2-digit", year: "numeric" }) }}
        </div>

        <span @click="supprimerReservation(reservation.id)" class="badgeBtn badge bg-danger rounded-pill">Supprimer</span>
      </li>
    </ol>
  </section>
</template>

<script>
export default {
  name: "Reservations",

  data() {
    return {
      reservations: []
    };
  },

  mounted() {
    if (!localStorage.getItem("user") && !localStorage.getItem("token")) {
      this.$router.push("/");
    }

    this.getReservations();
  },

  methods: {
    supprimerReservation(id) {
      fetch(`http://localhost:8080/api/reservation/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then((response) => response.json())
      .then((data) => {
        alert('Reservation supprimée!');
        this.getReservations();
      });
    },

    getReservations() {
      fetch(`http://localhost:8080/api/reservation`, {
        method: "GET",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then((response) => response.json())
      .then((data) => {
        this.reservations = data;
      });
    }
  },
}
</script>

<style scoped>

</style>
