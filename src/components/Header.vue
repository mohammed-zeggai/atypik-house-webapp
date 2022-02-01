<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="http://localhost:8081/img/logo.png" alt="Logo" id="logo" />
        </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
            Accueil
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/locations" class="nav-link">
              Nos biens
            </router-link>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">Contactez nous</a>
          </li>
        </ul>

        <!-- Menus -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <!-- Menu compte -->
          <li class="nav-item dropdown nav-right">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span v-if="!userConnected">Mon compte <i class="fas fa-solid fa-user"></i></span>
              <span v-if="userConnected">{{ userFullName }} <i class="fas fa-solid fa-user"></i></span>
            </a>

            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <!-- Non Connecté -->
              <li v-if="!userConnected">
                <router-link to="/register" class="dropdown-item">
                  Créer un compte
                </router-link>
              </li>

              <li v-if="!userConnected">
                <router-link to="/login" class="dropdown-item">
                  Se Connecter
                </router-link>
              </li>

              <!-- Connecté -->
              <li v-if="userConnected">
                <router-link to="/profil" class="dropdown-item">
                  Mon Compte
                </router-link>
              </li>

              <li v-if="userConnected && userProprietaire">
                <router-link to="/create-location" class="dropdown-item">
                  Créer une location
                </router-link>
              </li>

              <li v-if="userConnected && userProprietaire">
                <router-link to="/locations" class="dropdown-item">
                  Mes Locations
                </router-link>
              </li>

              <li v-if="userConnected">
                <router-link to="/reservations" class="dropdown-item">
                  Mes Réservations
                </router-link>
              </li>

              <li v-if="userConnected">
                <router-link to="#" @click="logout" class="dropdown-item">
                  Se Déconnecter
                </router-link>
              </li>
            </ul>
          </li>

          <!-- Menu de notifications -->
          <li v-if="userConnected" class="nav-item dropdown nav-left">
            <a class="nav-link dropdown-toggle bell-icon-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-solid fa-bell"></i></span>
            </a>

            <ul class="dropdown-menu" aria-labelledby="notifications">
              <ul class="list-group" style="width: 380px">
                <li v-for="notif in notifs" :key="notif.id" class="list-group-item">
                  {{ notif.message }}
                  <span @click="supprimerNotification(notif.id)" class="badgeBtn badge bg-danger rounded-pill">
                    <i class="fas fa-solid fa-trash"></i>
                  </span>
                </li>
              </ul>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      userConnected: false,
      userProprietaire: false,
      userId: null,
      userFullName: "",
      notifs: []
    };
  },

  mounted() {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      this.userConnected = true;

      const user = JSON.parse(localStorage.getItem("user"));
      this.userProprietaire = user.role == "ROLE_PROPRIETAIRE";
      this.userId = user.id;
      this.userFullName = user.nom + " " + user.prenom;

      this.recupererNotifications();
    }
  },

  methods: {
    logout() {
      localStorage.clear();
      window.location.reload();
    },

    recupererNotifications() {
      // Récupérer les notifs
      fetch(`http://localhost:8080/api/notification/${this.userId}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        this.notifs = data;
      });
    },

    supprimerNotification(id) {
      // Supprimer une notif
      fetch(`http://localhost:8080/api/notification/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        this.recupererNotifications();
      });
    }
  },
};
</script>

<style scoped>
#logo {
  width: 100px;
  height: 60px;
}

.bell-icon-toggle::after {
  display: none;
}
</style>
