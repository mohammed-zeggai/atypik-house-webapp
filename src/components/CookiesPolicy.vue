<template>
  <section class="py-5 container" style="text-align: justify">
    <h1 class="display-16 mb-4 text-dark" style="margin-top: 7rem" align="center">Politique d'utilisation des Cookies</h1><br />
  <div class="cookies-policy">
    <div class="container">
      <section>
        <h2>1. Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier de données que nous plaçons sur votre appareil lorsque vous visitez notre site. Les cookies nous aident à améliorer votre expérience en ligne et à mieux comprendre la façon dont notre site est utilisé.
        </p>
      </section>

      <section>
        <h2>2. Pourquoi utilisons-nous des cookies ?</h2>
        <p>
          Nous utilisons des cookies pour :
        </p>
        <ul>
          <li>Analyser le trafic du site pour améliorer nos services.</li>
          <li>Mémoriser vos préférences et paramètres.</li>
          <li>Offrir une expérience utilisateur personnalisée.</li>
          <li>Vous permettre de partager des contenus via les réseaux sociaux.</li>
        </ul>
      </section>

      <section>
        <h2>3. Types de cookies utilisés :</h2>
        <p>
          Nous utilisons différents types de cookies sur notre site :
        </p>
        <ul>
          <li><strong>Cookies nécessaires</strong> : Ces cookies sont essentiels pour la navigation et l'utilisation des fonctionnalités du site.</li>
          <li><strong>Cookies de performance</strong> : Ces cookies nous permettent de recueillir des informations sur la façon dont les utilisateurs utilisent le site.</li>
          <li><strong>Cookies de fonctionnalité</strong> : Ils nous aident à mémoriser vos préférences pour personnaliser votre expérience sur notre site.</li>
          <li><strong>Cookies de publicité</strong> : Utilisés pour afficher des publicités pertinentes selon vos intérêts.</li>
        </ul>
      </section>

      <section>
        <h2>4. Comment gérer vos cookies ?</h2>
        <p>
          Vous pouvez choisir d'accepter ou de refuser les cookies. En fonction de votre navigateur, vous pouvez gérer vos préférences relatives aux cookies. Vous pouvez également effacer les cookies déjà enregistrés. Consultez les paramètres de confidentialité de votre navigateur pour plus de détails.
        </p>
      </section>

      <section>
        <h2>5. Conséquences du refus des cookies</h2>
        <p>
          Si vous choisissez de désactiver les cookies, certaines fonctionnalités du site pourraient ne pas fonctionner correctement.
        </p>
      </section>

      <section>
        <h2>6. Modifications de notre politique sur les cookies</h2>
        <p>
          Nous pouvons mettre à jour cette politique de temps à autre. Toute modification sera publiée sur cette page avec une nouvelle date d'entrée en vigueur.
        </p>
      </section>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: "CookiesPolicy"
};
</script>

<style scoped>
.cookies-policy {
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

section {
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.3rem;
  font-weight: bold;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

p {
  font-size: 1rem;
  line-height: 1.5;
}
</style>
