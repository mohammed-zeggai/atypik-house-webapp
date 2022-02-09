<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img :src="`${webUrl}/img/logo.png`" alt="Logo" id="logo" />
        </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse"  id="navbarNavDropdown">
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
            <a class="nav-link" href="#footer-id">Contactez nous</a>
          </li>
        </ul>

        
        <!-- Menus -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <!-- Menu compte -->
          <li class="nav-item dropdown nav-right">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">

              <span v-if="!userConnected">
                Mon compte <i class="fas fa-solid fa-user"></i>
              </span>

              <span v-if="userConnected">
                {{ userFullName }} <i class="fas fa-solid fa-user"></i>
              </span>
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

              <li v-if="userConnected && userAdmin">
                <router-link to="/users-list" class="dropdown-item">
                  Gestion des utilisateurs
                </router-link>
              </li>

              <li v-if="userConnected && (userProprietaire || userAdmin)">
                <router-link to="/create-location" class="dropdown-item">
                  Créer une location
                </router-link>
              </li>

              <li v-if="userConnected && (userProprietaire || userAdmin)">
                <router-link to="/locations-list" class="dropdown-item">
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
import { apiUrl, webUrl } from '../env.js';

export default {
  name: "Header",

  data() {
    return {
      userConnected: false,
      userProprietaire: false,
      userAdmin: false,
      userId: null,
      userFullName: "",
      notifs: [],
      webUrl
    };
  },

  mounted() {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      this.userConnected = true;

      const user = JSON.parse(localStorage.getItem("user"));
      this.userProprietaire = user.role == "ROLE_PROPRIETAIRE";
      this.userAdmin = user.role == "ROLE_ADMIN";
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
      fetch(`${apiUrl}/api/notification/${this.userId}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => response.json())
      .then((data) => {
        this.notifs = data;
      });
    },

    supprimerNotification(id) {
      // Supprimer une notif
      fetch(`${apiUrl}/api/notification/delete/${id}`, {
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

