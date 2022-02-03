<template>
  <section class="100vh bg-image text-center">
    <div class="row gx-0 gy-6 align-items-center">
      <section class="py-5 lg-6 text-center display-2 mb-4" id="First">
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
              <h1 class="display-2 mb-2 text-white">Trouvez votre prochaines endroit insolites
              </h1><br />
              
            </div>
          </div>

          <div class="mc-field-group input-group form-floating display-4 mb-5">
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
        </div>

        <div class="container text-center">
          <div class="text-white">
            <h3 class="display-4 mb-2">Découvrez nos location d’habitats alternatifs</h3>
          </div>
        </div>
      </section>

        <div class="row py-lg-4">
          <h4 class="display-4 mb-4 text-dark">Découvrir nos hébergements AtypikHouse</h4>
            
              <div
                v-for="location in newestLocations"
                :key="location.id"
                class="col-md-4 col-s-12"
              >
                <div class="card" style="border-radius: 35px">
                  <div class="card-body p-5">
                    <img
                      src="https://pastel-immo.fr/wp-content/uploads/2019/11/11-Les-diffe%CC%81rents-types-dagence-immobilie%CC%80re.jpg"
                      class="card-img-top"
                      alt="Image"
                    />

                    <div class="card-body">
                      <h5 class="card-title">{{ location.titre }}</h5>
                      <p class="card-text">{{ location.description }}</p>
                      <p class="card-text">Prix: {{ location.prix }} €</p>

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
      

      <div class="rows">
        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">
              First featurette heading.
              <span class="text-muted">It’ll blow your mind.</span>
            </h2>
            <p class="lead">
              Some great placeholder content for the first featurette here.
              Imagine some exciting prose here.
            </p>
          </div>
          <div class="col-md-5">
            <svg
              class="
                bd-placeholder-img bd-placeholder-img-lg
                featurette-image
                img-fluid
                mx-auto
              "
              width="500"
              height="500"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: 500x500"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#eee"></rect>
              <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
            </svg>
          </div>
        </div>

        <hr class="featurette-divider" />

        <div class="row featurette" id="row3">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading">
              Oh yeah, it’s that good.
              <span class="text-muted">See for yourself.</span>
            </h2>
            <p class="lead">
              Another featurette? Of course. More placeholder content here to
              give you an idea of how this layout would work with some actual
              real-world content in place.
            </p>
          </div>
          <div class="col-md-5 order-md-1">
            <svg
              class="
                bd-placeholder-img bd-placeholder-img-lg
                featurette-image
                img-fluid
                mx-auto
              "
              width="500"
              height="500"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: 500x500"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#eee"></rect>
              <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
            </svg>
          </div>
        </div>

        <hr class="featurette-divider" />
        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">
              First featurette heading.
              <span class="text-muted">It’ll blow your mind.</span>
            </h2>
            <p class="lead">
              Some great placeholder content for the first featurette here.
              Imagine some exciting prose here.
            </p>
          </div>
          <div class="col-md-5">
            <svg
              class="
                bd-placeholder-img bd-placeholder-img-lg
                featurette-image
                img-fluid
                mx-auto
              "
              width="500"
              height="500"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: 500x500"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#eee"></rect>
              <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
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

<style>
body,
html {
  height: 100%;

  
  /* fallback for old browsers */
  background: #cefdff;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgb(124, 124, 124), rgb(251, 254, 255))
}
* {
  margin: 0;
}
#First {
  /* The image used */

  background-image: url("https://images.pexels.com/photos/2734166/pexels-photo-2734166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-repeat: no-repeat;
  background-size: cover;
}
.gradient-custom-4 {
  /* fallback for old browsers */
  background: #4dff8e;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgb(36, 250, 196), rgb(148, 255, 237));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgb(88, 255, 171), rgb(0, 255, 157))
}
</style>
