<template>
  <div class="container-fluid">
    <div class="mx-auto col-10 col-sm-8 col-md-6 col-lg-4">
      <form class="login-form">
        <div class="form-group">
          <label class="form-label" for="username">USERNAME</label>
          <input
            class="form-control shadow-none"
            type="text"
            v-model.trim="username"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="password">PASSWORD</label>
          <input
            class="form-control shadow-none"
            type="password"
            v-model.trim="password"
          />
        </div>
        <button
          @click.prevent="login"
          type="submit"
          class="btn btn-success my-3"
        >
          LOGIN
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-if="loadingStatus"
          ></span>
        </button>
      </form>
      <br />
      <p v-if="!validForm" class="response">Please don't leave empty fields.</p>
      <br />
      <div class="response">
        {{ response }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      validForm: true,
    };
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions(["authenticate", "clearTheMessage"]),
    async login() {
      this.clearTheMessage();
      this.validForm = true;
      if (this.username === "" || this.password === "") {
        this.validForm = false;
        return;
      }
      await this.authenticate({
        username: this.username,
        password: this.password,
      });
    },
  },
  computed: {
    ...mapGetters(["response", "loadingStatus"]),
  },
};
</script>

<style scoped>
label {
  margin: 10px 0 0 0 !important;
  font-size: 18px;
  font-weight: bolder;
}

input {
  border: none;
  border-bottom: 1px solid #006699;
  padding: 5px 0 0 0;
  text-align: center;
}
button:hover {
  font-weight: bold;
  color: #1e847f;
  background-color: white;
  border: 1px solid #1e847f;
}
</style>
