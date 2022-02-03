<template>
  <section class="py-5 text-center container">
   <div class="card p-3" style="border-radius: 5px">
      <div class="row">
      <li
      
        v-for="reservation in reservations"
        :key="reservation.id"
        class="list-group-item d-flex justify-content-between align-items-start"
      >
      
        <div class="col-md-5" >
          <div class="position-relative snipimage" >
            <img
              src="https://images.pexels.com/photos/1673994/pexels-photo-1673994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
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
      </div>
  </section>
</template>

<script>
export default {
  name: "Reservations",

  data() {
    return {
      reservations: [],
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
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Reservation supprimée!");
          this.getReservations();
        });
    },

    getReservations() {
      fetch(`http://localhost:8080/api/reservation`, {
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

<style scoped>
</style>
