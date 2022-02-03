<template>
  <section class="py-5 text-center container">
    <div v-if="reservationCreated" class="alert alert-success" role="alert">
      Votre réservation à été envoyé au proprietaire!
    </div>

    Page paiement

    <button class="btn btn-success" @click="reserverLocation">Payer & Réserver</button>
  </section>
</template>

<script>
export default {
  name: "Payment",

  data() {
    return {
      userConnected: false,
      id: null,
      reservation: {
        user: { id: null },
        location: { id: null }
      },
      reservationCreated: false
    };
  },

  mounted() {
    if (!localStorage.getItem("user") && !localStorage.getItem("token")) {
      this.$router.push("/");
      return;
    }
    
    // Récupérer l'id depuis l'url
    this.id = this.$route.params.id;

    // Parametrer les requetes
    const user = JSON.parse(localStorage.getItem("user"));
    this.reservation.user.id = user.id;
    this.reservation.location.id = this.id;
  },

  methods: {
    reserverLocation() {
      fetch(
        "http://localhost:8080/api/reservation/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(this.reservation),
        }
      )
      .then((response) => response.json())
      .then((data) => {
        this.reservationCreated = true;
        window.scrollTo(0, 0);
      });
    }
  }
};
</script>
