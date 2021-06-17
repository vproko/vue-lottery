<template>
  <div id="nav">
    <Navbar />
  </div>
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  padding-top: 56px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 0;
}

sub {
  font-weight: bold;
}

a {
  color: white !important;
  font-weight: bold;
}

a.router-link-exact-active {
  background-color: #006699 !important;
  color: white !important;
}

.nav-link:hover,
.nav-item:hover {
  background-color: #006699;
  color: white !important;
}

button {
  font-weight: bold !important;
}

router-view {
  padding-top: 50px !important;
}

.response {
  color: #006699;
  text-transform: uppercase;
  font-weight: bold;
}

tbody td {
  font-weight: bold;
}

tbody tr:hover {
  background-color: #006699;
  color: white !important;
}

h3 {
  -webkit-text-stroke: 1px #006699;
  margin-top: 30px;
}
h3,
caption {
  color: #006699;
  font-weight: bolder;
}

.register-form,
.login-form,
.update-form {
  padding: 0px 30px 10px 30px;
  border-radius: 13px;

  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;

  border: 2px solid #2c3e50;
  background-color: rgba(255, 255, 255, 0.637);
  -webkit-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
}
</style>
