<template>
  <div v-if="showCookieBanner" class="cookie-banner">
    <div class="cookie-content">
      <p>
        Nous utilisons des cookies pour améliorer votre expérience. En continuant à naviguer sur ce site, vous acceptez notre 
        <a href="/politiqueConfidentialite">politique de confidentialité</a> et nos 
        <a href="/cookie-policy">conditions d'utilisation des cookies</a>.
      </p>
      <button @click="acceptCookies">Accepter</button>
      <button @click="rejectCookies">Refuser</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookieConsent',

  data() {
    return {
      // Cette donnée garde la trace de l'affichage de la bannière des cookies
      showCookieBanner: !localStorage.getItem('cookiesAccepted') && !localStorage.getItem('cookiesRejected')
    };
  },

  methods: {
    acceptCookies() {
      // Quand l'utilisateur clique sur "Accepter", on cache la bannière
      this.showCookieBanner = false;
      // Et on enregistre dans le localStorage que l'utilisateur a accepté
      localStorage.setItem('cookiesAccepted', 'true');
    },

    rejectCookies() {
      // Quand l'utilisateur clique sur "Refuser", on cache la bannière et on marque le refus dans le localStorage
      this.showCookieBanner = false;
      localStorage.setItem('cookiesRejected', 'true');
    }
  }
};
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 14px;
}

.cookie-banner .cookie-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.cookie-banner button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
}

.cookie-banner button:hover {
  background-color: #45a049;
}

.cookie-banner a {
  color: #ffcc00;
  text-decoration: none;
}

.cookie-banner a:hover {
  text-decoration: underline;
}
</style>
