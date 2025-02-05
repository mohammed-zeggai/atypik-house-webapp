import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
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

import './styles.css';
import QuiSommesNous from './components/QuiSommesNous.vue';
import RegisterProprietaire from './components/RegisterProprietaire.vue';
import CookieConsent from './components/CookieConsent.vue';


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
  { path: '/qui-sommes-nous', component: QuiSommesNous }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

const app = createApp(App)
  .use(router)
  .use(createMetaManager());
app.component('CookieConsent', CookieConsent);
app.mount('#app');

