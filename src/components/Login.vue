<template>
  <section class="vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="display-8  col-sm-6 text-black gradient-custom-3"
        ><br><br>
          <br><br>
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
              height-70-percent
            "
          >
            <form @submit="login" style="margin: auto;" >
              <div
                v-if="badCredentials"
                class="alert alert-danger"
                role="alert"
              >
                L'adresse mail ou le mot de passe sont incorrectes!
              </div>

              <div class="card1" style="border-radius: 4px; width: 420px">
                <div class="card-body p-5">
                  <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
                    Se Connecter
                  </h3>

                  <div class="input-group mb-3">
                    <input
                      type="email"
                      id="email"
                      class="form-control"
                      placeholder="email@domain.com"
                      v-model="user.email"
                      required
                    />
                  </div>

                  <div class="input-group mb-3">
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      placeholder="Mot de passe"
                      v-model="user.password"
                      required
                    />
                  </div>

                    <div class="d-flex justify-content-center">
                        <button 
                            style="margin: 5px; margin-left: 0px" 
                            class="
                            btn btn-success btn-block btn-lg
                            gradient-custom-4
                            text-body
                            "
                            type="submit">Se connecter</button>
                        <button class="btn btn-secondary" type="reset">Annuler</button>
                    </div><br>
                    <p>
                        Vous n'avez pas de compte ?
                        <a :href="`${webUrl}/register`" class="link-dark">S'inscrire</a>
                    </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img
            src="https://images.pexels.com/photos/8001019/pexels-photo-8001019.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Login image"
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
  name: "Login",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      badCredentials: false,
      webUrl
    };
  },

  setup() {
    useMeta({
      meta: [
        //{ rel: 'canonical', href: 'url' },
        { name: 'description', content: 'Accèder à votre compte Atypik House.' }
      ]
    });
  },

  mounted() {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },

  methods: {
    login(ev) {
      ev.preventDefault();

      // Connecter l'utilisateur
      fetch(`${apiUrl}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify(this.user),
      })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 403) {
            this.badCredentials = true;
            return; // Arrêter ici car on ne peut pas parser un JSON vide
          } else {
            throw new Error(`Erreur serveur: ${response.status}`);
          }
        }
        
        const data = await response.json();
        
        if (data.body) {
          // Désactiver l'erreur précédente
          this.badCredentials = false;
          
          // Stocker le token dans le localStorage
          localStorage.setItem("token", data.body);
          
          // Récuperer les données de l'utilistaeur
          fetch(`${apiUrl}/api/user/byEmail/` + this.user.email, {
            method: "GET",
            headers: { Authorization: "Bearer " + data.body,},
          })
          .then((res) => res.json())
          .then((userData) => {
            if (userData.id) {
              localStorage.setItem("user", JSON.stringify(userData));
              window.location.reload();
            }
          });
        }
      })
      .catch((error) => {
        console.error("Erreur pendant le login :", error);
      });
    },
  },
};
</script>
