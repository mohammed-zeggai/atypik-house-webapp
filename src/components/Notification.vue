<template>
 <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-12 col-md-8 mx-auto">
      <h5>Nos derniers locations</h5>
  <div class="container">
    <div class="row">
     <div v-for="location in newestLocations" :key="location.id" class="col-lg-4 mb-10mx-auto">
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
</div>
 </div>
 </div>


</section>
</template>
<script>
export default {
  name: 'Notification',
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


