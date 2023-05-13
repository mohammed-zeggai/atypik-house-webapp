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
        <Card :location="location"/>
      </div>
    </div>
  </section>
</template>

<script>
import { apiUrl } from '../env.js';
import Card from "./common/Card.vue";

export default {
  name: "Locations",

  components: {
    Card
  },

  data() {
    return {
      locations: [],
    };
  },

  mounted() {
    fetch(`${apiUrl}/api/location`)
    .then((response) => response.json())
    .then((data) => {
      this.locations = data.reverse();
    });
  },
};
</script>
