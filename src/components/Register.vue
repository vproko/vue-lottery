<template>
  <div class="mx-auto col-10 col-sm-8 col-md-6 col-lg-4">
    <form class="register-form">
      <div class="form-group">
        <label class="form-label" for="first-name">FIRST NAME</label>
        <input
          class="form-control shadow-none"
          type="text"
          v-model="newUser.firstName"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="last-name">LAST NAME</label>
        <input
          class="form-control shadow-none"
          type="text"
          v-model="newUser.lastName"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="username">USERNAME</label>
        <input
          class="form-control shadow-none"
          type="text"
          v-model="newUser.username"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="password">PASSWORD</label>
        <input
          class="form-control shadow-none"
          type="password"
          v-model="newUser.password"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="confirm-password"
          >CONFIRM PASSWORD</label
        >
        <input
          class="form-control shadow-none"
          type="password"
          v-model="newUser.confirmPassword"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="email">EMAIL</label>
        <input
          class="form-control shadow-none"
          type="email"
          v-model="newUser.email"
        />
      </div>
      <div class="buttons">
        <button
          type="reset"
          class="btn btn-danger"
          id="reset"
          @click="resetForm"
        >
          RESET
        </button>
        <button
          @click.prevent="register"
          type="submit"
          class="btn btn-success my-3"
          id="register"
        >
          REGISTER
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-if="loadingStatus"
          ></span>
        </button>
      </div>
    </form>
    <br />
    <p v-if="!validForm" class="response">Please don't leave empty fields.</p>
    <br />
    <div class="response">
      {{ response }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      validForm: true,
      newUser: {
        firstName: null,
        lastName: null,
        username: null,
        password: null,
        confirmPassword: null,
        email: null,
      },
    };
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions(["clearTheMessage", "registerUser"]),
    checkInputs() {
      const values = [];
      for (const element of document.querySelectorAll("input")) {
        values.push(element.value);
      }
      const result = values.some((x) => x === "");
      return result ? true : false;
    },
    resetForm() {
      this.validForm = true;
      for (const key in this.updatedInfo) {
        this.updatedInfo[key] = null;
      }
    },
    async register() {
      this.validForm = true;
      if (!this.checkInputs()) {
        return await this.registerUser(this.newUser);
      }
      this.validForm = false;
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
  border-bottom: 1px solid #0099ff;
  padding: 5px 0 0 0;
  text-align: center;
}

#register:hover {
  font-weight: bold;
  color: #1e847f;
  background-color: white;
  border: 1px solid #1e847f;
}

button {
  margin: 0 5px;
}

#reset:hover {
  font-weight: bold;
  color: #dc3545;
  background-color: white;
  border: 1px solid #dc3545;
}
</style>
