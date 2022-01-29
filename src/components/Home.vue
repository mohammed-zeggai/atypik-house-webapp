<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">Album example</h1>
        <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p>
      </div>
    </div>

    <div class="row py-lg-5">
      <h5>Nos derniers locations:</h5>

      <div v-for="location in newestLocations" :key="location.id" class="col-md-4 col-s-12">
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
  name: 'Home',

  data() {
    return {
      newestLocations: []
    }
  },

  mounted() {
    fetch('http://localhost:8080/api/location/newest')
    .then(response => response.json())
    .then((data) => {
      this.newestLocations = data;
    });
  }
}
</script>
