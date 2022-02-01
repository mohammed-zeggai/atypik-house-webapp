<template>
  <section class="py-5 text-center container">
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

<style scoped>
button {
  margin: 5px;
}
</style>
