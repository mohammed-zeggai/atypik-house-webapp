import { createSSRApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';
import { createMetaManager } from 'vue-meta';

import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Locations from './components/Locations.vue';
import LocationDetail from './components/LocationDetail.vue';
import Profil from './components/Profil.vue';
import Reservations from './components/Reservations.vue';
import CreateLocation from './components/CreateLocation.vue';
import UsersList from './components/UsersList.vue';
import LocationsList from './components/LocationsList.vue';
import Faq from './components/Faq.vue';
import CgvCgu from './components/CgvCgu.vue';
import MentionsLegales from './components/MentionsLegales.vue';
import PolitiqueConfidentialite from './components/PolitiqueConfidentialite.vue';
import QuiSommesNous from './components/QuiSommesNous.vue';
import RegisterProprietaire from './components/RegisterProprietaire.vue';
import CookiesConsent from './components/CookiesConsent.vue';
import CookiesPolicy from './components/CookiesPolicy.vue';

import './styles.css';

// Tes routes extraites dans un tableau
const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/registerProprietaire', component: RegisterProprietaire },
  { path: '/login', component: Login },
  { path: '/locations', component: Locations },
  { path: '/location/:id', component: LocationDetail },
  { path: '/reservations', component: Reservations },
  { path: '/profil', component: Profil },
  { path: '/create-location', component: CreateLocation },
  { path: '/users-list', component: UsersList },
  { path: '/locations-list', component: LocationsList },
  { path: '/faq', component: Faq },
  { path: '/cgvCgu', component: CgvCgu },
  { path: '/mentionsLegales', component: MentionsLegales },
  { path: '/politiqueConfidentialite', component: PolitiqueConfidentialite },
  { path: '/qui-sommes-nous', component: QuiSommesNous },
  { path: '/cookie-policy', component: CookiesPolicy }
];

export function createApp() {
  const app = createSSRApp(App);

  const router = createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory() // côté serveur on utilise history en mémoire
      : createWebHistory(process.env.BASE_URL), // côté client history web normale
    routes,
  });

  const metaManager = createMetaManager();

  app.use(router);
  app.use(metaManager);

  // Enregistre le composant global CookiesConsent (optionnel)
  app.component('CookiesConsent', CookiesConsent);

  return { app, router, metaManager };
}
