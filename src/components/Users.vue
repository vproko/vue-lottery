<template>
  <div class="mx-auto col-10 col-sm-10 col-md-10 col-lg-10">
    <table class="table caption-top">
      <caption>
        USERS LIST
      </caption>
      <thead>
        <tr class="table-header">
          <th>USERNAME</th>
          <th>FIRST NAME</th>
          <th>LAST NAME</th>
          <th>JOINED</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="usersList">
        <tr v-for="user in usersList" :key="user.userId">
          <td class="align-middle">{{ user.userId }}</td>
          <td class="align-middle">{{ user.firstName }}</td>
          <td class="align-middle">{{ user.lastName }}</td>
          <td class="align-middle">{{ user.username }}</td>
          <td class="align-middle" id="trash-icon">
            <i @click="deleteUser(user.userId)" class="fas fa-trash fa-lg"></i>
          </td>
        </tr>
        <tr v-show="!usersList">
          <td class="align-middle" colspan="4" id="users-info">
            THERE'RE NO USERS
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="response">{{ response }}</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Users",
  async created() {
    await this.getUsersList();
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions(["clearTheMessage", "getUsersList", "deleteUserById"]),
    async deleteUser(userId) {
      await this.deleteUserById(userId);
    },
  },
  computed: {
    ...mapGetters(["response", "usersList"]),
  },
};
</script>

<style scoped>
h3 {
  margin-top: 30px;
  font-weight: bold;
}

i {
  color: coral;
}

i:hover {
  cursor: pointer;
  color: #ffc3ae;
}

#trash-icon {
  border-top-width: 1px;
}

.table-header {
  color: ivory;
  background-color: #1e847f;
}

table {
  margin-top: 30px;
  border: 2px solid #2c3e50;
  background-color: rgba(255, 255, 255, 0.637);
  -webkit-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
}
</style>
