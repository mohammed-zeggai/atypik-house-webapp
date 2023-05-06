<template>
  <section class="py-5 text-center container">
    <div v-if="reservationCreated" class="alert alert-success" role="alert">
      Votre réservation à été envoyé au proprietaire!
    </div>

    <div class="container d-flex justify-content-center mt-5 mb-5">
    <div class="row g-3">
        <div class="col-md-12" style="margin-top:95px"> 
            <div class="card">
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header p-0" id="headingTwo">
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header p-0">
                            <h2 class="mb-0"> 
                              
                                    <div class="d-flex align-items-center justify-content-between"> <span>Credit card</span>
                                        <div class="icons"> <img src="https://i.imgur.com/2ISgYja.png" width="60"> <img src="https://i.imgur.com/W1vtnOV.png" width="30"> <img src="https://i.imgur.com/35tC99g.png" width="30"> <img src="https://i.imgur.com/2ISgYja.png" width="60"> </div>
                                    </div>
                                </h2>
                        </div>
                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body payment-card-body"> <span class="font-weight-normal card-text">Numéro de la carte</span>
                                <div class="input"> <i class="fa fa-credit-card"></i> <input type="text" class="form-control" placeholder="0000 0000 0000 0000" required> </div>
                                <div class="row mt-3 mb-3">
                                    <div class="col-md-6"> <span class="font-weight-normal card-text">Date Expiration</span>
                                        <div class="input"> <i class="fa fa-calendar"></i> <input type="text" class="form-control" placeholder="MM/YY" required> </div>
                                    </div>
                                    <div class="col-md-6"> <span class="font-weight-normal card-text">CVC/CVV</span>
                                        <div class="input"> <i class="fa fa-lock"></i> <input type="text" class="form-control" placeholder="000" required> </div>
                                    </div>
                                </div> <span class="text-muted certificate-text"><i class="fa fa-lock"></i>Votre transaction est sécurisée avec un certificat ssl</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  <button class="btn btn-success" @click="reserverLocation">Payer & Réserver</button>
  </section>
</template>

<script>
import { apiUrl } from '../env.js';

export default {
  name: "Payment",

  props: {
    reservationData: Object
  },

  data() {
    return {
      userConnected: false,
      id: null,
      reservation: {
        user: { id: null },
        location: { id: null },
        ...this.reservationData
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
        `${apiUrl}/api/reservation/create`, {
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
