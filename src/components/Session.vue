<template>
  <div class="mx-auto col-10 col-sm-10 col-md-10 col-lg-10">
    <table class="table caption-top">
      <caption>
        SESSION INFO
      </caption>
      <thead>
        <tr class="table-header">
          <th>SESSION ID</th>
          <th>START DATE</th>
          <th>END DATE</th>
          <th>TICKETS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="sessionStartDate">
          <td class="align-middle">{{ activeSession.sessionId }}</td>
          <td class="align-middle">{{ sessionStartDate }}</td>
          <td class="align-middle">{{ sessionEndDate }}</td>
          <td class="align-middle">{{ sessionTickets.length }}</td>
        </tr>
        <tr v-show="!sessionStartDate">
          <td class="align-middle" colspan="4" id="session-info">
            THERE'S NO ACTIVE SESSION AT THE MOMENT
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <button
      id="start-session"
      class="btn btn-success"
      v-if="!sessionStartDate"
      @click="startSession"
    >
      START SESSION
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        v-if="loadingStatus"
      ></span>
    </button>
    <button
      id="end-session"
      class="btn btn-danger"
      v-if="sessionStartDate"
      @click="endSession"
    >
      END SESSION
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        v-if="loadingStatus"
      ></span>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Session",
  async created() {
    await this.checkActiveSession();
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions([
      "clearTheMessage",
      "checkActiveSession",
      "endSession",
      "startSession",
    ]),
  },
  computed: {
    ...mapGetters([
      "response",
      "activeSession",
      "sessionStartDate",
      "sessionEndDate",
      "sessionTickets",
      "loadingStatus",
    ]),
  },
};
</script>

<style scoped>
table {
  border: 2px solid #2c3e50;
  background-color: rgba(255, 255, 255, 0.637);
  -webkit-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
}

table {
  width: 100%;
  margin-top: 30px;
}

h3 {
  margin-top: 30px;
  font-weight: bold;
}

.loader {
  margin-top: 10%;
}

#session-info {
  font-weight: bold;
}

#start-session:hover {
  font-weight: bold;
  color: #1e847f;
  background-color: white;
  border: 1px solid #1e847f;
}

#end-session:hover {
  font-weight: bold;
  color: #dc3545;
  background-color: white;
  border: 1px solid #dc3545;
}
.table-header {
  color: ivory;
  background-color: #1e847f;
}
</style>
