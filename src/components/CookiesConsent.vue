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
  name: 'CookiesConsent',

  data() {
    return {
      showCookieBanner: true
    };
  },

  mounted() {
    // Ici on est côté client, on peut accéder à localStorage
    const accepted = localStorage.getItem('cookiesAccepted');
    const rejected = localStorage.getItem('cookiesRejected');
    this.showCookieBanner = !accepted && !rejected;
  },

  methods: {
    acceptCookies() {
      this.showCookieBanner = false;
      localStorage.setItem('cookiesAccepted', 'true');
    },

    rejectCookies() {
      this.showCookieBanner = false;
      localStorage.setItem('cookiesRejected', 'true');
    }
  }
};
</script>

<style scoped>
</style>
