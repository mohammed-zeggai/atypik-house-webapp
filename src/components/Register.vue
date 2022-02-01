<template>
  <section class="py-5 text-center container">
    <div v-if="userCreated" class="alert alert-success"  role="alert">
      Votre compte à été crée avec succes! <router-link to="/login" class="alert-link">Connectez-vous?</router-link>
    </div>

    <div v-if="passwordsDoNotMatch" class="alert alert-danger"  role="alert">
      Le mot de passe doit être identique à sa confirmation
    </div>

    <div v-if="errorMessage" class="alert alert-danger"  role="alert">
      {{ errorMessage }}
    </div>

    <form @submit="createAccount">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nom" v-model="user.nom" required>
      </div>

      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Prénom" v-model="user.prenom" required>
      </div>

      <div class="input-group mb-3">
        <input type="email" class="form-control" placeholder="email@domain.com" v-model="user.email" required>
      </div>

      <div class="input-group mb-3">
        <input type="password" class="form-control" placeholder="Mot de passe" v-model="user.password" required>
      </div>

      <div class="input-group mb-3">
        <input type="password" class="form-control" placeholder="Confirmation Mot de Passe" v-model="user.passwordVerification" required>
      </div>

      <div class="input-group mb-3">
        <button style="margin:5px; margin-left:0px" class="btn btn-info" type="submit">Créer mon compte</button>
        <button style="margin:5px" class="btn btn-secondary" type="reset">Annuler</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Register',

  data() {
    return {
      user: {
        nom: '',
        prenom: '',
        email: '',
        password: '',
        passwordVerification: '',
        role: 'ROLE_CLIENT'
      },
      userCreated: false,
      passwordsDoNotMatch: false,
      errorMessage: null
    }
  },

  mounted() {
    if (localStorage.getItem('user') && localStorage.getItem('token'))  {
      this.$router.push('/');
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
      fetch('http://localhost:8080/api/user/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.user)
      }).then(response => response.json())
      .then(data => {
        this.errorMessage = data.message;
        
        if (data.id) {
          this.userCreated = true;
        }
      });
    }
  }
}
</script>
