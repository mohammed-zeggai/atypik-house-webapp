<template>
  <section
    class="100vh bg-image"
    style="
      background-image: url('https://www.wallpaperbetter.com/wallpaper/290/32/975/winter-landscape-river-forest-trees-sky-clouds-snow-1080P-wallpaper.jpg');
    "
  >
  <div v-if="userCreated" class="alert alert-success" role="alert">
    Votre compte à été crée avec succes!
    <router-link to="/login" class="alert-link">Connectez-vous?</router-link>
  </div>

  <div v-if="passwordsDoNotMatch" class="alert alert-danger" role="alert">
    Le mot de passe doit être identique à sa confirmation
  </div>

  <div v-if="errorMessage" class="alert alert-danger" role="alert">
    {{ errorMessage }}
  </div>
   <form @submit="createAccount" class="gradient-custom-3"><br><br><br>
    <div class="mask d-flex align-items-center h-100">
      <div class="container h-100 ">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style="border-radius: 45px; height: 800px;">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-3">S'inscrire</h2>
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
                      required
                    />
                  </div>

                  <div class="input-group mb-3">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Mot de passe"
                      v-model="user.password"
                      required
                    />
                  </div>

                  <div class="input-group mb-3">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Confirmation Mot de Passe"
                      v-model="user.passwordVerification"
                      required
                    />
                  </div>
                
                  <div class="form-check d-flex justify-content-center mb-3">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3cg"
                    />
                    <label class="form-check-label" for="form2Example3g">
                    Proprétaire
                    </label>
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      style="margin-left:50px"
                      value=""
                      id="form2Example3cg"
                    />
                    <label class="form-check-label" for="form2Example3g">
                    Locataire
                    </label>
                  </div>
                  <div class="form-check d-flex justify-content-center mb-3">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3cg"
                    />
                    <label class="form-check-label" for="form2Example3g">
                    I agree all statements in
                    <a href="#!" class="text-body"><u>Terms of service</u></a>
                  </label>
                  </div>
                    
                  <div class="d-flex justify-content-center">
                    <button style="margin: 5px; margin-left: 0px" 
                            class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" 
                            type="submit">
                      Créer mon compte
                    </button>
                    <button style="margin: 5px" class="btn btn-secondary" type="reset">
                      Annuler
                    </button>
                  </div>

                  <p class="text-center text-muted mt-5 mb-0">
                    Vous avez déjà un compte ?
                    <a href="http://localhost:8081/login" class="fw-bold text-body"><u>Se Connecter</u></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      user: {
        nom: "",
        prenom: "",
        email: "",
        password: "",
        passwordVerification: "",
        role: "ROLE_CLIENT",
      },
      userCreated: false,
      passwordsDoNotMatch: false,
      errorMessage: null,
    };
  },

  mounted() {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },

  methods: {
    createAccount(ev) {
      // Arreter l'evenement de rechargement de la page
      ev.preventDefault();

      // Tester si le password et sa verification sont bons
      if (this.user.password != this.user.passwordVerification) {
        this.passwordsDoNotMatch = true;
        return;
      }

      // Désactiver l'erreur et supprimer le champ de verification de la requete
      this.passwordsDoNotMatch = false;
      delete this.user.passwordVerification;

      // Creation de l'utilisateur
      fetch("http://localhost:8080/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.user),
      })
        .then((response) => response.json())
        .then((data) => {
          this.errorMessage = data.message;

          if (data.id) {
            this.userCreated = true;
          }
        });
    },
  },
};
</script>
 <style >

 .checkboxes {
  text-align:center;
}
.card{
  background-color: rgb(225, 242, 246);
}
.checkboxes input{
  margin: 0 20px 0;
}

.gradient-custom-3{
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5))
}
.gradient-custom-4 {
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5))
}
 
 </style>
