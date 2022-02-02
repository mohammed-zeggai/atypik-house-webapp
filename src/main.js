import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Locations from './components/Locations.vue';
import LocationDetail from './components/LocationDetail.vue';
import Profil from './components/Profil.vue';
import Reservations from './components/Reservations.vue';
import CreateLocation from './components/CreateLocation.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/locations',
    component: Locations
  },
  {
    path: '/location/:id',
    component: LocationDetail
  },
  {
    path: '/reservations',
    component: Reservations
  },
  {
    path: '/profil',
    component: Profil
  },
  {
    path: '/create-location',
    component: CreateLocation
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
