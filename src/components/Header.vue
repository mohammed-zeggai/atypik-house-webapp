<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <!-- Atypik House -->
        <img src="http://localhost:8081/img/logo.png" alt="Logo" id="logo">
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

          <li class="nav-item">
            <router-link to="/notifications" class="nav-link">
              Notification
            </router-link>
          </li>
        </ul>

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown nav-right">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span v-if="!userConnected">Mon compte</span>
              <span v-if="userConnected">{{ userFullName }}</span>
            </a>

            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <!-- L'utilisateur n'est pas connecté -->
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
              
              <!-- L'utilisateur est connecté -->
              <li v-if="userConnected">
                <router-link to="/profil" class="dropdown-item">
                  Mon Profil
                </router-link>
              </li>
              <li v-if="userConnected">
                <router-link to="#" @click="logout" class="dropdown-item">
                  Se Déconnecter
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  
  data() {
    return {
      userConnected: false,
      userFullName: ''
    }
  },

  mounted() {
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      this.userConnected = true;

      const user = JSON.parse(localStorage.getItem('user'));
      this.userFullName = user.nom + ' ' + user.prenom;
    }
  },

  methods: {
    logout() {
      localStorage.clear();
      window.location.reload();
    }
  }
}
</script>

<style>
#logo {
  width: 120px;
  height: 40px;
}
</style>
