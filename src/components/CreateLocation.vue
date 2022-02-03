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
                <input
                  type="text"
                  class="form-control"
                  placeholder="Planning"
                  v-model="location.planning"
                />
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
        surface: "",
        image: "",
        planning: "",
        prix: "",
        adresse: ""
      },
      created: false,
      descriptionTooLong: false
    };
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.location.user.id = user.id;

    if (!localStorage.getItem("user") && !localStorage.getItem("token")
    || (user.role != "ROLE_PROPRIETAIRE" && user.role != "ROLE_ADMIN")) {
      this.$router.push("/");
      return;
    }
  },

  methods: {
    createLocation(ev) {
      ev.preventDefault();

      if (this.location.description.length > 500) {
        this.descriptionTooLong = true;
        return;
      }

      // Créer la location
      fetch('http://localhost:8080/api/location/create', {
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
