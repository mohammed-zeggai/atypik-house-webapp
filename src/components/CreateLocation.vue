<template>
  <div class="row">
    <div class="col-xl-4">
      <div
        class="card mb-4 mb-xl-0"
        style="margin-left: 150px; margin-top: 20px"
      >
        <div class="card-header">Photo de profil</div>
        <div class="card-body text-center">
          <img
            class="img-account-profile rounded-circle mb-2"
            :src="
              location.image || 'http://bootdey.com/img/Content/avatar/avatar1.png'
            "
            alt="User Avatar"
          />

          <div class="small font-italic text-muted mb-4">
            JPG ou PNG ne dépassant pas 5 Mo
          </div>

          <label for="formFile" class="form-label"
            >Mettre à jour votre photo de profil</label
          >

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
          <div class="card-header">Détails du compte</div>

          <div v-if="updated" class="alert alert-success" role="alert">
            Votre compte à été mis à jour!
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
              <input
                type="email"
                class="form-control"
                placeholder="Description"
                v-model="location.description"
                maxlength="500"
                disabled
                required
              />
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
                placeholder="Date de naissance : yyyy-mm-dd"
                v-model="user.dateNaissance"
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="telephone"
                class="form-control"
                placeholder="Telephone"
                v-model="user.telephone"
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="adresse"
                class="form-control"
                placeholder="Adresse"
                v-model="user.adresse"
              />
            </div>

            <hr />

            <div v-if="badCredentials" class="alert alert-danger" role="alert">
              le mot de passe actuel est incorrecte!
            </div>

            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Mot de passe actuel"
                v-model="user.password"
                required
              />
            </div>

            <div class="input-group mb-3">
              <button
                style="margin: 5px; margin-left: 0px"
                type="submit"
                class="btn btn-info"
              >
                Mettre à jour
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
    };
  },

  mounted() {
    if (!localStorage.getItem("user") && !localStorage.getItem("token")) {
      this.$router.push("/");
      return;
    }
  },

  methods: {
    createLocation(ev) {
      ev.preventDefault();

    }
  },
};
</script>

<style>
body {
  background-color: #f2f6fc;
  color: #69707a;
}
.card {
  box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}
</style>
