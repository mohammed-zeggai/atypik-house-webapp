<template>
  <div class="100vh bg-image">
    <section class="py-5 lg-6 text-center display-1 mb-2" id="First">
      <div class="container" style="z-index: 5; position: relative">
        <div
          class="mask rgba-black-light d-flex justify-content-center align-items-center"
        >
          <div class="text-center">
            <br />
            <h1 class="display-2 mb-4 text-white">
              Trouvez votre prochaines endroit insolites
            </h1>
            <br />
          </div>
        </div>

        <div class="mc-field-group input-group form-floating display-2 mb-4">
          <label class="row label-view1" for="mce-EMAIL2"></label>
          <input
            type="date"
            name="startDate"
            class="required form-control"
            v-model="planningStartDate"
          />
          <label class="row" for="mce-EMAIL2"></label>
          <input
            type="date"
            name="endDate"
            class="required form-control"
            v-model="planningEndDate"
          />
          <input
            @click="rechercherLocations()"
            class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
            type="submit"
            value="Rechercher"
          />
        </div>
      </div>
      
      <div class="modal fade" tabindex="-1" id="searchResults">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Bien trouvées</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <section class="container-fluid">
                <div class="row" v-if="searchResults.length">
                  <div
                    v-for="location in searchResults"
                    :key="location.id"
                    class="col-sm-6"
                  >
                    <Card :location="location"
                      :smallText="true" />
                  </div>
                </div>

                <h6 v-if="!searchResults.length">Aucun Résultat Trouvé!</h6>
              </section>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div class="display-4 mb-4 text-center text-white">
        <h1>Découvrez nos location d’habitats alternatifs</h1>
        <br />
      </div>
    </section>

    <section class="py-5 container">
      <div class="row py-lg-4">
        <h2 class="display-4 mb-4 text-center text-dark">
          Vous souhaitez vivre une expérience insolite ?
        </h2>
        <h3 class="display-4 mb-4 text-center text-dark">
          Nous vous proposons différents types d'hébergements qui vous
          laisseront des souvenirs inoubliables.
        </h3>

        <div
          v-for="location in newestLocations"
          :key="location.id"
          class="col-md-4 col-s-12"
        >
          <br />
          <br />
          <Card :location="location" />
        </div>
        <br />
        <hr />
      </div>

      <div class="rows">
        <div class="row featurette">
          <div class="col-md-7">
            <br />
            <h2 class="featurette-heading">
              <br />

              <span class="text-muted">VIVEZ UNE ÉXPERIENCE INOUBLIABLE !</span>
            </h2>
            <br />
            <p class="lead">
              A 4, 10 ou même 20 mètres de haut, nos cabanes perchées en
              Bretagne vous offriront le souvenir inoubliable d'un week end
              insolite à partager en famille, entre amis ou en amoureux.<br />
              Au petit-matin, hissez le panier du petit-déjeuner en hauteur
              jusqu’à votre terrasse et le soir, laissez-vous tenter par un
              panier repas pour profiter pleinement de votre cabane insolite en
              pleine nature, à quelques mètres du sol.<br />
              Elles sont des exemples d’éco-construction en bois, sans eau ni
              électricité et équipées de toilettes sèches. A l’intérieur,
              éclairage à la bougie et mobilier en bois véritable. Un petit
              chauffage d’appoint est installé en hiver pour une nuitée
              confortable dans votre lit.
            </p>
          </div>

          <div class="col-md-5">
            <img
              class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              width="500"
              height="500"
              src="https://images.pexels.com/photos/9209878/pexels-photo-9209878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              role="img"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            /><br />
            <rect width="100%" height="100%" fill="#eee"></rect>
          </div>

          <br />
          <hr class="featurette-divider" />
          <br />

          <div class="col-md-5">
            <img
              class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              width="500"
              height="500"
              src="https://images.pexels.com/photos/6526181/pexels-photo-6526181.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              role="img"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            />
            <rect width="100%" height="100%" fill="#eee"></rect>
          </div>
          <div class="col-md-7">
            <br />
            <h2 class="featurette-heading">
              <br />

              <span class="text-muted"
                >VENEZ DÉCOUVRIR LES ACTIVITÉS ET LOISIRS À PROXIMITÉ DU PARC
                NATURE & OCÉAN</span
              >
            </h2>
            <br />
            <p class="lead">
              126 km de plages de sable fin, océanes ou lacustres, abritent une
              palette de stations balnéaires pour tous les goûts : Le Verdon,
              Soulac Sur Mer, Montalivet, Carcans, Lacanau… jusqu’au Bassin
              d’Arcachon.<br />
              Pour les amateurs de sensations un large choix d’activités à
              pratiquer : le surf, le kayak des mers, kyte surf… On peut
              s’initier à la planche à voile ou au catamaran avec l’UCPA.<br />D’autres
              activités plus paisibles vous attendent, vous pouvez emprunter les
              140 Km de pistes cyclables. Location de vélo avec Garage à Vélo
              (Hourtin Port), côtoyer la faune et la flore des différents
              sentiers balisés ou pratiquer la pêche au bord du lac.
            </p>
          </div>

          <br />
          <hr class="featurette-divider" />
          <br />

          <div class="col-md-7">
            <br />
            <h2 class="featurette-heading">
              <br />

              <span class="text-muted">BALADE ET DÉCOUVERTES</span>
            </h2>
            <br />
            <p class="lead">
              Entre lac, océan et vignobles des châteaux de rêve, un univers à
              découvrir : les vins du Médoc.<br />
              La départementale 2, route des vins, traverse la plupart des
              grandes appellations :<br />
              Haut Médoc, Saint Julien, Pauillac, Saint Estèphe…<br />
              D’autres activités liées à l’exploitation de la vigne vous
              attendent :<br />
              Visites de la Lagune de Contaut (marais boisé parsemé de fougères
              géantes) & des rives Est du lac (paysages, découverte de la
              végétation et peut-être aussi des traces de loutre…). Sites
              protégés, visites gratuites avec un guide naturaliste de juin à
              septembre.<br />
              Balade en forêt & brame du cerf en septembre : encadré par un
              guide naturaliste, balade en petit groupe dans les zones humides
              de la forêt pour écouter le brame du cerf.<br />
              Sortie mycologie en octobre : journée en forêt à la découverte des
              différentes espèces de champignons en compagnie d’un guide
              naturaliste.
            </p>
          </div>
          <div class="col-md-5">
            <img
              class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              width="500"
              height="500"
              src="https://images.pexels.com/photos/1800387/pexels-photo-1800387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              role="img"
              aria-label="Placeholder: 500x500"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            />
            <rect width="100%" height="100%" fill="#eee"></rect>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { apiUrl } from "../env.js";
import Card from "./common/Card.vue";

export default {
  name: "Home",

  components: {
    Card
  },

  data() {
    return {
      newestLocations: [],
      planningStartDate: new Date(),
      planningEndDate: new Date(),
      searchResults: []
    };
  },

  mounted() {
    fetch(`${apiUrl}/api/location/newest`)
      .then((response) => response.json())
      .then((data) => {
        this.newestLocations = data;
      });
  },

  methods: {
    rechercherLocations() {
      fetch(
        `${apiUrl}/api/location/search/${this.planningStartDate}/${this.planningEndDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.searchResults = data;
          window.$('#searchResults').modal('show');
        });
    },
  },
};
</script>
