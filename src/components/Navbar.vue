<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <router-link class="nav-link" to="/">LO<sub>TT</sub>ERY</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="adminStatus && loginStatus">
            <router-link class="nav-link" to="/admin">ADMIN</router-link>
          </li>
          <li class="nav-item" v-if="loginStatus && !adminStatus">
            <router-link class="nav-link" to="/ticket">TICKET</router-link>
          </li>
          <li class="nav-item" v-if="loginStatus">
            <router-link class="nav-link" to="/profile">PROFILE</router-link>
          </li>
          <li class="nav-item" v-if="!loginStatus">
            <router-link class="nav-link" to="/register">REGISTER</router-link>
          </li>
          <li class="nav-item" v-if="!loginStatus">
            <router-link class="nav-link" to="/login">LOGIN</router-link>
          </li>
          <li class="nav-item" v-else>
            <a @click="logout" class="nav-link">LOGOUT</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["logout"]),
  },
  computed: {
    ...mapGetters(["loginStatus", "adminStatus"]),
  },
};
</script>

<style scoped>
sub {
  font-weight: bold;
  font-size: 16px;
}

a:hover {
  cursor: pointer;
}
</style>
