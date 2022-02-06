<template>
  <section class="py-5 container">
    <div class="row py-lg-8">
      <div
        class="text-center"
        data-cues="slideInDown"
        data-group="page-title"
        data-delay="600"
        data-disabled="true"
      >
        <h1
          class="display-16 mb-4 text-dark"
          data-cue="slideInDown"
          data-group="page-title"
          data-delay="600"
          data-show="true"
          style="
            animation-name: slideInDown;
            animation-duration: 700ms;
            animation-timing-function: ease;
            animation-delay: 600ms;
            animation-direction: normal;
            animation-fill-mode: both;
          "
        >
          <br />
          Découvrir nos hébergements AtypikHouse
        </h1>
      </div>

      <div
        v-for="location in locations"
        :key="location.id"
        class="col-md-4 col-s-12"
      >
         
        <div class="card" style="border-radius: 4px">
          <div>
            <img
              :src="location.image || 'https://pastel-immo.fr/wp-content/uploads/2019/11/11-Les-diffe%CC%81rents-types-dagence-immobilie%CC%80re.jpg'"
              class="card-img-top"
              alt="Image"
            />

            <div class="card-body">
              <h5 class="card-title" style="color:black">{{ location.titre }}</h5>
              <p class="card-text">{{ location.description }}</p>
              <p class="card-text" style="color:green">Prix : {{ location.prix }} €/Nuit</p>

              <router-link
                :to="'/location/' + location.id"
                class="btn btn-primary"
              >
                Consulter
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Locations",

  data() {
    return {
      locations: [],
    };
  },

  mounted() {
    fetch("http://localhost:8080/api/location")
    .then((response) => response.json())
    .then((data) => {
      this.locations = data;
    });
  },
};
</script>
