<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <h5>Nos locations:</h5>

      <div v-for="location in locations" :key="location.id" class="col-md-4 col-s-12">
        <div class="card">
          <img src="https://pastel-immo.fr/wp-content/uploads/2019/11/11-Les-diffe%CC%81rents-types-dagence-immobilie%CC%80re.jpg" class="card-img-top" alt="Image">

          <div class="card-body">
            <h5 class="card-title">{{ location.titre }}</h5>
            <p class="card-text">{{ location.description }}</p>
            <p class="card-text">Prix: {{ location.prix }} €</p>
            
            <router-link :to="'/location/' + location.id" class="btn btn-primary">
              Consulter
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Locations',
  
  data() {
    return {
      locations: []
    }
  },

  mounted() {
    fetch('http://localhost:8080/api/location')
    .then(response => response.json())
    .then((data) => {
      this.locations = data;
    });
  }
}
</script>
