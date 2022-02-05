<template>
    <div class="100vh bg-image">
        <section class="py-5 lg-6 text-center display-1 mb-2" id="First">
            <div class="container" style="z-index: 5; position: relative">
                <div
                class="
                    mask
                    rgba-black-light
                    d-flex
                    justify-content-center
                    align-items-center
                "
                >
                <div class="text-center">
                    <br />
                    <h1 class="display-2 mb-4 text-white">Trouvez votre prochaines endroit insolites
                    </h1><br />
                    
                </div>
                </div>

                <div class="mc-field-group input-group form-floating display-2 mb-4">
                <label class="row label-view1" for="mce-EMAIL2"></label>
                <input
                    type="date"
                    value=""
                    name="EMAIL"
                    class="required email form-control"
                    placeholder="Email Address"
                    id="mce-EMAIL2"
                />
                <label class="row" for="mce-EMAIL2"></label>
                <input
                    type="date"
                    value=""
                    name="EMAIL"
                    class="required email form-control"
                    placeholder="Email Address"
                    id="mce-EMAIL2"
                />
                <label class="" for="mce-EMAIL2"></label>
                <input
                    type="number"
                    value=""
                    name="EMAIL"
                    class="required email form-control"
                    placeholder="Email Address"
                    id="mce-EMAIL2"
                />
                <input
                    type="submit"
                    value="Rechercher"
                    name="recherche"
                    id="mc-embedded-subscribe2"
                    class="btn btn-success gradient-custom-4  btn-block btn-lg text-body"
                />
                </div>
            </div><br>

            <div class="container text-center">
                <input type="submit" class="btn btn-success gradient-custom-4  btn-block btn-lg text-body display-2 mb-4" value="Découvrez nos location d’habitats alternatifs"
                /><br><br>
            </div>
        </section>

        <section class="py-5 container">
            <div class="row py-lg-4">
                <h2 class="display-4 mb-4 text-center text-dark">Vous souhaitez vivre une expérience insolite ?
                    Nous vous proposons différents types d'hébergements qui vous laisseront des souvenirs inoubliables.</h2>
                <div
                v-for="location in newestLocations"
                :key="location.id"
                class="col-md-4 col-s-12"
                ><br><br>
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
                        <p class="card-text" style="color:green">Prix: {{ location.prix }} €/Nuit</p>

                        <router-link
                        :to="'/location/' + location.id"
                        class="btn btn-primary"
                        >
                        Consulter
                        </router-link>
                    </div>
                    </div>
                    
                </div>
                </div><br>
                <hr>
            </div>
            

            <div class="rows">
                <div class="row featurette">
                    <div class="col-md-7">

                        <br>
                        <h2 class="featurette-heading">
                        <br>

                        First featurette heading.
                        <span class="text-muted">It’ll blow your mind.</span>
                        </h2>
                        <p class="lead">
                        Some great placeholder content for the first featurette here.
                        Imagine some exciting prose here.
                        </p>
                    </div>
                    
                    <div class="col-md-5">
                        <img
                        class="
                            bd-placeholder-img bd-placeholder-img-lg
                            featurette-image
                            img-fluid
                            mx-auto
                        "
                        width="500"
                        height="500"
                        src="https://images.pexels.com/photos/9209878/pexels-photo-9209878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        role="img"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                        ><br>
                        <rect width="100%" height="100%" fill="#eee"></rect>
                    </div>

                    <br>
                    <hr class="featurette-divider" />
                    <br>

                   
                    <div class="col-md-5">
                        <img
                        class="
                            bd-placeholder-img bd-placeholder-img-lg
                            featurette-image
                            img-fluid
                            mx-auto
                        "
                        width="500"
                        height="500"
                        src="https://images.pexels.com/photos/6526181/pexels-photo-6526181.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        role="img"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                        >
                        <rect width="100%" height="100%" fill="#eee"></rect>
                    </div>
                    <div class="col-md-7">

                        <br>
                        <h2 class="featurette-heading">
                        <br>

                        First featurette heading.
                        <span class="text-muted">It’ll blow your mind.</span>
                        </h2>
                        <p class="lead">
                        Some great placeholder content for the first featurette here.
                        Imagine some exciting prose here.
                        </p>
                    </div>

                    <br>
                    <hr class="featurette-divider" />
                    <br>

                    <div class="col-md-7">

                        <br>
                        <h2 class="featurette-heading">
                        <br>

                        First featurette heading.
                        <span class="text-muted">It’ll blow your mind.</span>
                        </h2>
                        <p class="lead">
                        Some great placeholder content for the first featurette here.
                        Imagine some exciting prose here.
                        </p>
                    </div>
                    <div class="col-md-5">
                        <img
                        class="
                            bd-placeholder-img bd-placeholder-img-lg
                            featurette-image
                            img-fluid
                            mx-auto
                        "
                        width="500"
                        height="500"
                        src="https://images.pexels.com/photos/1800387/pexels-photo-1800387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        role="img"
                        aria-label="Placeholder: 500x500"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                        >
                        <rect width="100%" height="100%" fill="#eee"></rect>
                    </div>
                </div>
            </div>
        </section> 
    </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      newestLocations: [],
    };
  },

  mounted() {
    fetch("http://localhost:8080/api/location/newest")
      .then((response) => response.json())
      .then((data) => {
        this.newestLocations = data;
      });
  },
};
</script>

