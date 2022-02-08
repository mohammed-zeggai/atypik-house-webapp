<template>
  <section class="content py-5 text-center container" style="margin-top:114px">
   <div class="card p-3" style="border-radius: 4px">
      <div class="row">
        <li
          v-for="user in users"
          :key="user.id"
          class="d-flex justify-content-between align-items-start listing-item"
        >
          <div class="col-md-5">
            <div class="position-relative snipimage">
              <img
                :src="user.image || 'http://bootdey.com/img/Content/avatar/avatar1.png'"
                class="rounded img-fluid w-100 img-responsive"
                style="width: 30px !important;"
              />
            </div>

            <div>
              <strong>{{ user.id }}: </strong> {{ user.nom }} {{ user.prenom }}, né (e)

              le
              {{
                new Date(user.dateNaissance).toLocaleDateString("fr-FR", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })
              }}
            </div>
          </div>

          <span>
            <select :value="user.role" @change="setNewRole($event)">
              <option value="ROLE_CLIENT">ROLE_CLIENT</option>
              <option value="ROLE_PROPRIETAIRE">ROLE_PROPRIETAIRE</option>
              <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            </select>
          </span>

          <span
            @click="modifierUserRole(user.id)"
            class="badgeBtn badge bg-info rounded-pill">Modifier</span>

          <span
            @click="supprimerUser(user.id)"
            class="badgeBtn badge bg-danger rounded-pill">Supprimer</span>
        </li>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Reservations",

  data() {
    return {
      users: [],
      newUserRole: null
    };
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!localStorage.getItem("user") && !localStorage.getItem("token") || user.role != "ROLE_ADMIN") {
      this.$router.push("/");
    }

    this.getUsers();
  },

  methods: {
    setNewRole(event) {
      this.newUserRole = event.target.value;
    },

    modifierUserRole(id) {
      fetch(`http://localhost:8080/api/user/updateRole/${id}/${this.newUserRole}`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => response.json())
      .then((data) => {
        alert("Role d'utilisateur modifié!");
        this.getUsers();
      });
    },

    supprimerUser(id) {
      fetch(`http://localhost:8080/api/user/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => response.json())
      .then((data) => {
        alert("Utilisateur supprimée!");
        this.getUsers();
      });
    },

    getUsers() {
      fetch(`http://localhost:8080/api/user`, {
        method: "GET",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => response.json())
      .then((data) => {
        this.users = data;
      });
    }
  },
};
</script>

