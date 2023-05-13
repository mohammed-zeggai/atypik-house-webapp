<template>
  <div class="card" style="border-radius: 4px">
    <div>
      <img
        :src="
          location.image ||
          'https://pastel-immo.fr/wp-content/uploads/2019/11/11-Les-diffe%CC%81rents-types-dagence-immobilie%CC%80re.jpg'
        "
        class="card-img-top"
        alt="Image"
        width="80%"
      />

      <div class="card-body">
        <h5 class="card-title" style="color: black">
          {{ location.titre }}
        </h5>
        <p class="card-text" :style="smallText ? 'font-size: 14px;' : ''">{{ location.description }}</p>
        <p class="card-text" :style="smallText ? 'font-size: 14px; color: green' : 'color: green;'">
          Prix : {{ location.prix }} €/Nuit
        </p>

        <router-link
          @click="clearModal()"
          :to="'/location/' + location.id"
          class="btn btn-primary"
        >
          Consulter
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",

  props: {
    location: Object,
    smallText: Boolean
  },

  methods: {
    clearModal() {
      window.$('#searchResults').modal('hide');
    }
  }
}
</script>
