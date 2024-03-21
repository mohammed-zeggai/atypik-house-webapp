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
          Mes hébergements AtypikHouse
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
               <p class="card-text">{{ location.description }}</p>
              <p class="card-text" style="color:green">Prix : {{ location.prix }} €/Nuit</p>

              <router-link
                :to="'/location/' + location.id"
                class="btn btn-primary"
              >
                Consulter
              </router-link>

              <button
                @click="showModal(location)"
                data-bs-toggle="modal" data-bs-target="#editModal"
                class="btn btn-info"
              >
                Modifier
              </button>

              <button
                @click="supprimerLocation(location.id)"
                class="btn btn-danger"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="editModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modifier Location</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetErrors()"></button>
            </div>

            <div class="modal-body">
              <form @submit="updateLocation">
                <div class="card mb-4">
                  <div class="card-body text-center">
                    <img
                      class="img-location mb-2"
                      :src="
                        location.image || 'https://pastel-immo.fr/wp-content/uploads/2019/11/11-Les-diffe%CC%81rents-types-dagence-immobilie%CC%80re.jpg'
                      "
                      alt="User Avatar"
                    />

                    <input
                      class="form-control"
                      type="text"
                      id="imgUrl"
                      placeholder="URL d'image"
                      v-model="location.image"
                    />
                  </div>
                </div>

                <div class="card ">
                  <div v-if="updated" class="alert alert-success" role="alert">
                    La location à été crée avec succés!
                  </div>

                  <div v-if="descriptionTooLong" class="alert alert-danger" role="alert">
                    Le champ description ne doit pas dépasser 500 caractéres.
                  </div>
                
                  <div class="card-body">
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Titre"
                        v-model="location.titre"
                        required
                      />
                    </div>

                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Type Location"
                        v-model="location.type"
                        required
                      />
                    </div>

                    <div class="input-group mb-3">
                      <textarea
                        type="text"
                        class="form-control"
                        placeholder="Description"
                        v-model="location.description"
                        maxlength="500"
                        required>
                        </textarea>
                    </div>

                    <div class="input-group mb-3">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Surface"
                      
                        v-model="location.surface"
                      />
                    </div>

                    <div class="input-group mb-3">
                      <input type="date" class="form-control" name="planning-start"
                        :min="new Date().toDateString()" required v-model="location.planningStartDate">

                      <input type="date" class="form-control" name="planning-end"
                        :min="new Date().toDateString()" required v-model="location.planningEndDate">
                    </div>


                    <div class="input-group mb-3">
                      <input
                        type="telephone"
                        class="form-control"
                        placeholder="Prix"
                        v-model="location.prix"
                      />
                    </div>

                    <div class="input-group mb-3">
                      <input
                        type="adresse"
                        class="form-control"
                        placeholder="Adresse"
                        v-model="location.adresse"
                      />
                    </div>

                    <hr />

                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckbox1"
                        @change="addEquipement($event)"
                        :checked="location.equipementsArray.includes('Chauffage')"
                        value="Chauffage">

                      <label class="form-check-label" for="inlineCheckbox1">Chauffage</label>
                    </div>

                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckbox2"
                        @change="addEquipement($event)"
                        :checked="location.equipementsArray.includes('Climatisation')"
                        value="Climatisation">

                      <label class="form-check-label" for="inlineCheckbox2">Climatisation</label>
                    </div>

                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckbox3"
                        @change="addEquipement($event)"
                        :checked="location.equipementsArray.includes('Cuisine')"
                        value="Cuisine">

                      <label class="form-check-label" for="inlineCheckbox3">Cuisine</label>
                    </div>

                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckbox4"
                        @change="addEquipement($event)"
                        :checked="location.equipementsArray.includes('Jacuzzi')"
                        value="Jacuzzi">

                      <label class="form-check-label" for="inlineCheckbox4">Jacuzzi</label>
                    </div>

                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckbox5"
                        @change="addEquipement($event)"
                        :checked="location.equipementsArray.includes('Wifi')"
                        value="Wifi">

                      <label class="form-check-label" for="inlineCheckbox5">Wifi</label>
                    </div>

                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckbox6"
                        @change="addEquipement($event)"
                        :checked="location.equipementsArray.includes('Télévision')"
                        value="Télévision">

                      <label class="form-check-label" for="inlineCheckbox6">Télévision</label>
                    </div>

                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="inlineCheckbox7"
                        @change="addEquipement($event)"
                        :checked="location.equipementsArray.includes('Parking gratuit')"
                        value="Parking gratuit">

                      <label class="form-check-label" for="inlineCheckbox7">Parking gratuit</label>
                    </div>

                    <hr />

                    <div class="input-group mb-3">
                      <button
                        style="margin: 5px; margin-left: 0px"
                        type="submit"
                        class="btn btn-info"
                      >
                        Modifier
                      </button>

                      <button
                        style="margin: 5px"
                        data-bs-dismiss="modal"
                        class="btn btn-secondary"
                        @click="resetErrors()"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

    
  </section>
</template>

<script>
import { apiUrl } from '../env.js';

export default {
  name: "LocationsList",

  data() {
    return {
      locations: [],
      location: {
        user: {
          id: null
        },
        titre: "",
        type: "",
        description: "",
        equipements: "",
        equipementsArray: [],
        surface: "",
        image: "",
        planningStartDate: "",
        planningEndDate: "",
        prix: "",
        adresse: ""
      },
      updated: false,
      descriptionTooLong: false,
      userId: null
    };
  },

  mounted() {
    if (!localStorage.getItem("user") && !localStorage.getItem("token")) {
      this.$router.push("/");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.id;

    this.getLocations();
  },

  methods: {
    resetErrors() {
      this.updated = false;
      this.descriptionTooLong = false;
    },

    showModal(location) {
      this.location = location;
      
      const stringParts = this.location.equipements.split('; ');
      stringParts.pop();
      this.location.equipementsArray = stringParts;
    }, 

    addEquipement(ev) {
      const value = ev.target.value;

      if (ev.target.checked) {
        if (!this.location.equipementsArray.includes(value)) {
          this.location.equipementsArray.push(value);
        }
      } else {
        if (this.location.equipementsArray.includes(value)) {
          const indexOfValue = this.location.equipementsArray.indexOf(value);
          this.location.equipementsArray.splice(indexOfValue, 1);
        }
      }
    },

    updateLocation(ev) {
      ev.preventDefault();

      if (this.location.description.length > 500) {
        this.descriptionTooLong = true;
        return;
      }

       // Créer le string equipements
      let equipementsString = '';
      this.location.equipementsArray.map(eq => equipementsString += eq + '; ');
      this.location.equipements = equipementsString;

      fetch(`${apiUrl}/api/location/update/${this.location.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("token")
        },
        body: JSON.stringify(this.location)
      })
      .then((response) => response.json())
      .then((data) => {
        this.updated = true;
      });
    },

    supprimerLocation(id) {
      fetch(`${apiUrl}/api/location/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer" + localStorage.getItem("token") },
      })
      .then((response) => response.json())
      .then((data) => {
        alert("Location supprimée !");
        this.getLocations();
      });
    },

    getLocations() {
      fetch(`${apiUrl}/api/location/forUser/${this.userId}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => response.json())
      .then((data) => {
        this.locations = data.reverse();
      });
    },
  },
};
</script>
