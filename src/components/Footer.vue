<template>
<footer class="text-center text-lg-start bg-light text-muted" id="footer-id">
  <section
    class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
  >
    
    <div class="me-5 d-none d-lg-block">
      <b>Rejoignez-nous sur les réseaux sociaux :</b>
    </div>

    <div>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-google"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-github"></i>
      </a>
    </div>
    <!-- Right -->
  </section>
  <!-- Section: Social media -->

  <!-- Section: Links  -->
  <section class="">
    <div class="container text-center text-md-start mt-5">
      <!-- Grid row -->
      <div class="row mt-3">
        <!-- Grid column -->
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <!-- Content -->
          <h6 class="text-uppercase fw-bold mb-4">
            <i class="fas fa-gem me-3"></i>Atypik House
          </h6>
          <p>
            Pour passer des vacances inoubliables, il est important de bien choisir sa location !
            Contactez-nous pour trouver votre AtypikHouse à louer et réservez dès maintenant votre location de vacances auprès de notre agence.
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">
            Liens direct
          </h6>
          <li>
            <router-link to="/PolitiqueConfidentialite" style="color: black" href="">Politique de confidentialité</router-link>
          </li>
          <li>
            <router-link to="/MentionsLegales" style="color: black">
              Mentions légales
            </router-link>
          </li>
          <li>
            <router-link to="/CgvCgu" style="color: black">
              CGV - CGU
            </router-link>
          </li>
          <li>
            <router-link to="/Faq" style="color: black">
              FAQ
            </router-link>
          </li>
          <li>
            <a :href="`${webUrl}/sitemap.xml`" style="color: black">
            Sitemap
            </a>
          </li>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">
            Êtes-vous locateur
          </h6>
           <p>
             Si vous êtes propriètaire d'un bien immobilier que vous souhaitez mettre en location saisonnière, contactez notre agence pour louer en toute sérénité.
           </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">
            Contact
          </h6>
          <p><i class="fas fa-home me-3"></i> 6 Rue Napoléon, 60350 Pierrefonds, France</p>
          <p>
            <i class="fas fa-envelope me-3"></i>
            contactus@atypikhouse.fr
          </p>
          <p><i class="fas fa-phone me-3"></i> +33 5 58 59 57 56</p>
          <p><i class="fas fa-print me-3"></i> +33 5 58 59 57 56</p>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>
  </section>
  <!-- Section: Links  -->

  <!-- Copyright -->
  <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
    © 2024 Copyright :
    <b>Atypik House</b> &nbsp;
    ATTENTION : Ce site internet est un projet étudiant. Aucune réservation ne sera donc honorée.
  </div>
  <!-- Copyright -->
</footer>

</template>

<script>
import { webUrl } from '../env';

export default {
  name: "Footer",

  data() {
    return {
        webUrl
    }
  }
}
</script>
