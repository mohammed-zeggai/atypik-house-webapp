<template>
  <section class="vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="display-8 col-md-6 col-sm-6 text-black gradient-custom-3">
          <div
            class="
              d-flex
              align-items
              h-custom-2
              px-5
              ms-xl-2
              mt-5
              pt-5 pt-xl-0
              mt-xl-n5
              height-90-percent
            "
          >
            <form @submit="createAccount" ref="formData" style="margin: auto;">
              <div class="container h-100">
                <div
                  class="card1"
                  style="border-radius: 4px; width:400px"
                >
                  <div class="card-body p-5 padding-10">
                    <div
                      v-if="userCreated"
                      class="alert alert-success"
                      role="alert"
                    >
                      Votre compte propriétaire a été créé avec succès!
                      <router-link to="/login" class="alert-link"
                        >Connectez-vous?</router-link
                      >
                    </div>

                    <div
                      v-if="passwordInvalid"
                      class="alert alert-danger"
                      role="alert"
                    >
                      Le mot de passe doit contenir:
                      <ul>
                        <li>au moins 8 caractères</li>
                        <li>un majuscule</li>
                        <li>un minuscule</li>
                        <li>un chiffre</li>
                        <li>un caractère spécial "!@#$%^&*"</li>
                      </ul>
                    </div>

                    <div
                      v-if="passwordsDoNotMatch"
                      class="alert alert-danger"
                      role="alert"
                    >
                      Le mot de passe doit être identique à sa
                      confirmation
                    </div>

                    <div
                      v-if="errorMessage"
                      class="alert alert-danger"
                      role="alert"
                    >
                      {{ errorMessage }}
                    </div>

                    <h2 class="text-uppercase text-center mb-3">
                      S'inscrire en tant que Propriétaire
                    </h2>
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

                    <div
                      class="form-check d-flex justify-content-center mb-3"
                    >
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        checked
                        disabled
                        id="isProprietaire"
                      />
                      <label class="form-check-label" for="isProprietaire">
                        Propriétaire
                      </label>
                    </div>

                    <div
                      class="form-check d-flex justify-content-center mb-3"
                    >
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="conditionsGenerales"
                        required
                      />
                      <label class="form-check-label" for="conditionsGenerales">
                        J'accepte les
                        <a href="#!" class="text-body"
                          ><u>conditions générales</u></a>
                      </label>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button
                            style="margin: 5px; margin-left: 0px"
                            class="
                            btn btn-success btn-block btn-lg
                            gradient-custom-4
                            text-body
                            "
                            type="submit"
                        >
                            Créer mon compte propriétaire
                        </button>
                        <button
                            style="margin: 5px"
                            class="btn btn-secondary"
                            type="reset"
                        >
                            Annuler
                        </button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">
                      Vous avez déjà un compte ?
                      <a
                        :href="`${webUrl}/login`"
                        class="fw-bold text-body"
                        ><u>Se Connecter</u></a
                      >
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img
            src="https://images.pexels.com/photos/8001019/pexels-photo-8001019.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Cabane perchée en pleine nature"
            class="w-100 vh-100"
            style="object-fit: cover; object-position: left"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useMeta } from "vue-meta";
import { apiUrl, webUrl } from '../env.js';

export default {
  name: "RegisterProprietaire",

  data() {
    return {
      user: {
        nom: "",
        prenom: "",
        email: "",
        password: "",
        passwordVerification: "",
        isProprietaire: true,
        role: "ROLE_PROPRIETAIRE",
      },
      userCreated: false,
      passwordInvalid: false,
      passwordsDoNotMatch: false,
      errorMessage: null,
      webUrl
    };
  },

  setup() {
    useMeta({
      meta: [
        { name: 'description', content: 'S’inscrire en tant que propriétaire sur Atypik House.' }
      ]
    });
  },

  mounted() {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },

  methods: {
    validatePassword() {
      const password = this.user.password;
      const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      return pattern.test(password);
    },

    createAccount(ev) {
      // Arreter l'evenement de rechargement de la page
      ev.preventDefault();

      // Tester si le password est valid
      if (!this.validatePassword()) {
        this.passwordInvalid = true;
        return;
      }

      // Tester si le password et sa verification sont bons
      if (this.user.password != this.user.passwordVerification) {
        this.passwordsDoNotMatch = true;
        return;
      }

      // Désactiver l'erreur et supprimer le champ de verification de la requete
      this.passwordInvalid = false;
      this.passwordsDoNotMatch = false;
      delete this.user.passwordVerification;

      // Tester si l'utilisateur est un proprietaire
      if (this.user.isProprietaire) {
        this.user.role = "ROLE_PROPRIETAIRE";
        delete this.user.isProprietaire;
      }
      
      // Creation de l'utilisateur
      fetch(`${apiUrl}/api/user/create`, {
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
