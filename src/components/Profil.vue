<template>
  <div class="row">
   
    <div class="col-xl-4"><br><br><br>
      <div
        class="card mb-4 mb-xl-0"
        style="margin-left: 150px; margin-top: 20px; border-radius: 25px"
      >
        <div class="card-header">Photo de profil</div>
        <div class="card-body text-center"><br><br>
          <img
            class="img-account-profile rounded-circle mb-2"
            :src="
              user.image || 'http://bootdey.com/img/Content/avatar/avatar1.png'
            "
            alt="User Avatar"
          />

          <div class="small font-italic text-muted mb-4">
            JPG ou PNG ne dépassant pas 5 Mo
          </div><br>

          <label for="formFile" class="form-label"
            >Mettre à jour votre photo de profil</label
          >

          <input
            class="form-control"
            type="text"
            id="imgUrl"
            placeholder="URL d'image"
            v-model="user.image"
          />
        </div>
      </div>
    </div>

    <div class="col-xl-8"><br><br><br>
      <form @submit="testCurrentPassword">
        <div class="card mb-4" style="margin-right: 150px; margin-top: 20px; border-radius: 25px">
          <div class="card-header">Détails du compte</div>

          <div v-if="updated" class="alert alert-success" role="alert">
            Votre compte à été mis à jour!
          </div>

          <div class="card-body">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nom"
                v-model="user.nom"
                required
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Prénom"
                v-model="user.prenom"
                required
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="email@domain.com"
                v-model="user.email"
                disabled
                required
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Nouveau Mot de passe"
                v-model="user.newPassword"
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
        </div><br>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profil",

  data() {
    return {
      user: {
        id: null,
        nom: "",
        prenom: "",
        email: "",
        newPassword: "",
        password: "",
        image: "",
        dateNaissance: "",
        telephone: "",
        adresse: "",
        role: "ROLE_CLIENT",
      },
      badCredentials: false,
      updated: false,
    };
  },

  mounted() {
    if (!localStorage.getItem("user") && !localStorage.getItem("token")) {
      this.$router.push("/");
      return;
    }

    this.user = JSON.parse(localStorage.getItem("user"));

    // Afficher date naissance
    if (this.user.dateNaissance != null) {
      const date = new Date(this.user.dateNaissance);
      this.user.dateNaissance = date
        .toISOString("en-US", { month: "2-digit", day: "2-digit" })
        .split("T")[0];
    } else {
      this.user.dateNaissance = "";
    }
  },

  methods: {
    testCurrentPassword(ev) {
      ev.preventDefault();

      // Construire l'objet de requete
      const userRequest = {
        nom: this.user.nom,
        prenom: this.user.prenom,
        email: this.user.email,
        password: this.user.password,
        image: this.user.image,
        dateNaissance: this.user.dateNaissance,
        telephone: this.user.telephone,
        adresse: this.user.adresse,
        role: "ROLE_CLIENT",
      };

      if (this.user.newPassword) {
        userRequest.password = this.user.newPassword;
      }

      if (this.user.dateNaissance) {
        userRequest.dateNaissance = this.user.dateNaissance;
      }

      if (this.user.telephone) {
        userRequest.telephone = this.user.telephone;
      }

      if (this.user.adresse) {
        userRequest.adresse = this.user.adresse;
      }

      if (this.user.image) {
        userRequest.image = this.user.image;
      }

      // Tester les credentials d'utilisateur
      fetch(
        `http://localhost:8080/api/user/testCredentials/${this.user.email}/${this.user.password}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      ).then((response) => {
        if (response.status == 404) {
          this.badCredentials = true;
        } else {
          this.badCredentials = false;
          this.updateUser(userRequest);
        }
      });
    },

    updateUser(request) {
      // Metter à jour l'utilisateur
      fetch(`http://localhost:8080/api/user/update/${this.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(request),
      })
        .then((response) => response.json())
        .then((data) => {
          this.updated = true;
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(data));
          window.location.reload();
        });
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f2f6fc;
  color: #69707a;
}
.card {
  box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}
.img-account-profile {
  height: 200px;
}
</style>
