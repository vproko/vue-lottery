<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 justify-content-evenly menu">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Session' }"
              >SESSION</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Draw' }"
              >DRAW</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Users' }"
              >USERS</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Prizes' }"
              >PRIZES</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'CreateAdmin' }"
              >CREATE ADMIN</router-link
            >
          </li>
        </ul>
      </div>
      <div class="col-10"><router-view></router-view></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
};
</script>

<style scoped>
a {
  color: #24426f !important;
}

a.router-link-exact-active {
  background-color: #24426f;
  color: white !important;
}

.nav-item {
  border: 1px solid #22426f !important;
}

.menu {
  padding: 0;
}
</style>
