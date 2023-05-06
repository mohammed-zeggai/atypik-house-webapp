<template>
  <section class="content py-5 text-center container-fluid">
    <div class="row">
      <div class="col-xl-4">
        <div
          class="card mb-4 mb-xl-0"
          style="margin-left: 150px; margin-top: 20px"
        >
          <div class="card-header">Photo de location</div>
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
      </div>

      <div class="col-xl-8">
        <form @submit="createLocation">
          <div class="card mb-4" style="margin-right: 150px; margin-top: 20px">
            <div class="card-header">Détails de la location</div>

            <div v-if="created" class="alert alert-success" role="alert">
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
                  placeholder="Prix par nuit"
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

              <div class="card-header display mb-3">Équipements</div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" @change="addEquipement($event)" value="Chauffage">
                <label class="form-check-label" for="inlineCheckbox1">Chauffage</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" @change="addEquipement($event)" value="Climatisation">
                <label class="form-check-label" for="inlineCheckbox2">Climatisation</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox3" @change="addEquipement($event)" value="Cuisine">
                <label class="form-check-label" for="inlineCheckbox3">Cuisine</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox4" @change="addEquipement($event)" value="Jacuzzi">
                <label class="form-check-label" for="inlineCheckbox4">Jacuzzi</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox5" @change="addEquipement($event)" value="Wifi">
                <label class="form-check-label" for="inlineCheckbox5">Wifi</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox6" @change="addEquipement($event)" value="Télévision">
                <label class="form-check-label" for="inlineCheckbox6">Télévision</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox7" @change="addEquipement($event)" value="Parking gratuit">
                <label class="form-check-label" for="inlineCheckbox7">Parking gratuit</label>
              </div>

              <hr />

              <div class="input-group mb-3">
                <button
                  style="margin: 5px; margin-left: 0px"
                  type="submit"
                  class="btn btn-info"
                >
                  Créer
                </button>

                <button
                  style="margin: 5px"
                  class="btn btn-secondary"
                  type="reset"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { apiUrl } from '../env.js';

export default {
  name: "CreateLocation",

  data() {
    return {
      location: {
        user: {
          id: null
        },
        titre: "",
        type: "",
        description: "",
        equipements: [],
        surface: "",
        image: "",
        planningStartDate: "",
        planningEndDate: "",
        prix: "",
        adresse: ""
      },
      created: false,
      descriptionTooLong: false
    };
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      this.location.user.id = user.id;
    }

    if (!localStorage.getItem("user") && !localStorage.getItem("token")
    || (user.role != "ROLE_PROPRIETAIRE" && user.role != "ROLE_ADMIN")) {
      this.$router.push("/");
      return;
    }
  },

  methods: {
    addEquipement(ev) {
      const value = ev.target.value;

      if (ev.target.checked) {
        if (!this.location.equipements.includes(value)) {
          this.location.equipements.push(value);
        }
      } else {
        if (this.location.equipements.includes(value)) {
          const indexOfValue = this.location.equipements.indexOf(value);
          this.location.equipements.splice(indexOfValue, 1);
        }
      }
    },

    createLocation(ev) {
      ev.preventDefault();

      if (this.location.description.length > 500) {
        this.descriptionTooLong = true;
        return;
      }

      // Créer le string equipements
      let equipementsString = '';
      this.location.equipements.map(eq => equipementsString += eq + '; ');
      this.location.equipements = equipementsString;

      // Créer la location
      fetch(`${apiUrl}/api/location/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(this.location)
      })
      .then((response) => response.json())
      .then((data) => {
        this.created = true;
      });
    }
  },
};
</script>
