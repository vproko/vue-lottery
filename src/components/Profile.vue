<template>
  <div class="btn-group edit-menu">
    <button
      type="button"
      class="btn btn-success dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ menuTitle }}
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <a class="dropdown-item" href="#" @click.prevent="changeForm($event)"
          >ALL</a
        >
      </li>
      <li>
        <a class="dropdown-item" href="#" @click.prevent="changeForm($event)"
          >NAME</a
        >
      </li>
      <li>
        <a class="dropdown-item" href="#" @click.prevent="changeForm($event)"
          >PASSWORD</a
        >
      </li>
      <li>
        <a class="dropdown-item" href="#" @click.prevent="changeForm($event)"
          >EMAIL</a
        >
      </li>
    </ul>
  </div>
  <div v-show="name || mail || password || all">
    <div class="mx-auto col-10 col-sm-8 col-md-6 col-lg-4 update-form">
      <form id="update-form">
        <div v-if="name || all">
          <div class="form-group">
            <label class="form-label" for="first-name">FIRST NAME</label>
            <input
              class="form-control shadow-none"
              type="text"
              v-model="updatedInfo.firstName"
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="last-name">LAST NAME</label>
            <input
              class="form-control shadow-none"
              type="text"
              v-model="updatedInfo.lastName"
            />
          </div>
        </div>
        <div v-if="password || all">
          <div class="form-group">
            <label class="form-label" for="old-password">OLD PASSWORD</label>
            <input
              class="form-control shadow-none"
              type="password"
              v-model="updatedInfo.oldPassword"
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="new-password">NEW PASSWORD</label>
            <input
              class="form-control shadow-none"
              type="password"
              v-model="updatedInfo.newPassword"
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="confirm-password"
              >CONFIRM NEW PASSWORD</label
            >
            <input
              class="form-control shadow-none"
              type="password"
              v-model="updatedInfo.confirmedPassword"
            />
          </div>
        </div>
        <div v-if="mail || all">
          <div class="form-group">
            <label class="form-label" for="email">EMAIL</label>
            <input
              class="form-control shadow-none"
              type="email"
              v-model="updatedInfo.email"
            />
          </div>
        </div>
        <button type="reset" class="btn btn-danger" id="reset">Reset</button>
        <button
          @click.prevent="updateData"
          type="submit"
          class="btn btn-success my-3"
          id="send"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  <br />
  <div class="mx-auto col-10 col-sm-8 col-md-6 col-lg-4 response">
    {{ response }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      menuTitle: "CHOOSE OPTION",
      updatedInfo: {
        firstName: null,
        lastName: null,
        oldPassword: null,
        newPassword: null,
        confirmedPassword: null,
        email: null,
      },
      all: false,
      name: false,
      password: false,
      mail: false,
    };
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions(["updateUserData", "setTheMessage", "clearTheMessage"]),
    changeForm(e) {
      this.menuTitle = e.target.innerText;
      this.resetForm();
      this.clearTheMessage();
      switch (e.target.innerText) {
        case "NAME":
          this.name = true;
          this.all = false;
          this.password = false;
          this.mail = false;
          break;
        case "PASSWORD":
          this.password = true;
          this.all = false;
          this.name = false;
          this.mail = false;
          break;
        case "EMAIL":
          this.mail = true;
          this.all = false;
          this.name = false;
          this.password = false;
          break;
        default:
          this.all = true;
          this.name = false;
          this.password = false;
          this.email = false;
      }
    },
    checkPasswordInputs() {
      this.clearTheMessage();
      const values = [];
      for (const element of document.querySelectorAll("input")) {
        if (element.getAttribute("type") === "password") {
          values.push(element.value);
        }
      }
      const result = values.some((x) => x === "");
      return result
        ? (true, this.setTheMessage("Don't leave empty fields."))
        : false;
    },
    checkNonPasswordInputs() {
      this.clearTheMessage();
      const values = [];
      for (const element of document.querySelectorAll("input")) {
        if (element.getAttribute("type") !== "password") {
          values.push(element.value);
        }
      }
      const result = values.every((x) => x === "");
      return result
        ? (true, this.setTheMessage("Don't leave empty fields."))
        : false;
    },
    checkWholeForm() {
      this.clearTheMessage();
      const values = [];
      for (const element of document.querySelectorAll("input")) {
        values.push(element.value);
      }
      const result = values.some((x) => x === "");
      return result
        ? (true, this.setTheMessage("Don't leave empty fields."))
        : false;
    },
    resetForm() {
      for (const key in this.updatedInfo) {
        this.updatedInfo[key] = null;
      }
    },
    updateData() {
      this.clearTheMessage();
      let hasEmpty;
      if (this.all === true) hasEmpty = this.checkWholeForm();
      if (this.password === true) hasEmpty = this.checkPasswordInputs();
      if (this.password === false && this.all === false)
        hasEmpty = this.checkNonPasswordInputs();
      if (!hasEmpty) this.updateUserData(this.updatedInfo);
    },
  },
  computed: {
    ...mapGetters(["response"]),
  },
};
</script>

<style scoped>
.edit-menu {
  margin-bottom: 30px;
}

#title {
  margin: 30px 0;
  font-weight: bold;
}

a {
  color: black !important;
  font-weight: bold;
}

.update-form {
  margin-top: 10px;
}

.edit-menu {
  margin: 13px auto;
}

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

#send:hover {
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
