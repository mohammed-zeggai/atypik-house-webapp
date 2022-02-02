<template>
  <!--<section class="py-5 text-center container">
    <div v-if="badCredentials" class="alert alert-danger" role="alert">
      L'adresse mail ou le mot de passe sont incorrectes!
    </div>

    <form @submit="login">
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

      <div class="input-group mb-3">
        <button class="btn btn-info" type="submit">Se connecter</button>
        <button class="btn btn-secondary" type="reset">Annuler</button>
      </div>
    </form>
  </section>!-->
  <section class="vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 text-black gradient-custom-3">
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

            "
          >
            <form @submit="login" style="width: 500px">
              <div
                v-if="badCredentials"
                class="alert alert-danger"
                role="alert"
              >
                L'adresse mail ou le mot de passe sont incorrectes!
              </div>

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

              <div class="input-group mb-3">
                <button class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" type="submit">Se connecter</button>
                <button class="btn btn-secondary" type="reset">Annuler</button>
              </div>

              <p class="small mb-5 pb-lg-2">
                <a class="text-muted" href="#!">Mot de passe oublier ?</a>
              </p>
              <p>
                  Vous n'avez pas de compte ?
                <a href="http://localhost:8081/register" class="link-info">S'inscrire</a>
              </p>
            </form>
          </div>
        </div>
        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img
            src="https://lacabanefieutee.com/wp-content/uploads/2020/01/32ffe4563df8474bca975d5635cfcfea-1080x1200.jpg"
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
export default {
  name: "Login",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      badCredentials: false,
    };
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
      fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.user),
      })
        .then((response) => {
          if (response.status == 403) {
            this.badCredentials = true;
          }
          return response.json();
        })
        .then((data) => {
          if (data.body) {
            // Désactiver l'erreur précédente
            this.badCredentials = false;

            // Stocker le token dans le localStorage
            localStorage.setItem("token", data.body);

            // Récuperer les données de l'utilistaeur
            fetch("http://localhost:8080/api/user/byEmail/" + this.user.email, {
              method: "GET",
              headers: { Authorization: "Bearer " + data.body },
            })
              .then((response) => response.json())
              .then((userData) => {
                if (userData.id) {
                  // L'utilisateur est récupéré
                  // Stocker le dans le localStorage
                  localStorage.setItem("user", JSON.stringify(userData));
                  window.location.reload();
                }
              });
          }
        });
    },
  },
};
</script>

<style scoped >
button {
  margin: 5px;
}

CSS .bg-image-vertical {
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 100%;
}

@media (min-width: 1025px) {
  .h-custom-2 {
    height: 100%;
  }
}
.gradient-custom-3{
 /* fallback for old browsers */
  background: #1df3f3;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgb(8, 222, 230), rgba(143, 211, 244, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgb(14, 203, 250), rgb(158, 217, 246))
}
</style>
