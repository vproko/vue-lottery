<template>
  <br />
  <div class="mx-auto col-xs-12 col-sm-12 col-md-9 col-lg-8 col-xl-6">
    <table class="table prizes caption-top">
      <caption>
        PRIZES
      </caption>
      <thead>
        <tr class="table-header">
          <th>NAME</th>
          <th>NUMBER OF HITS</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="prizes">
        <tr v-for="prize in prizes" :key="prize.prizeId">
          <td class="align-middle">{{ prize.name }}</td>
          <td class="align-middle">{{ prize.numberOfHits }}</td>
          <td class="align-middle" id="trash-icon">
            <i
              @click="deleteThePrize(prize.prizeId)"
              class="fas fa-trash fa-lg"
            ></i
            >&nbsp;&nbsp;&nbsp;
            <i @click="updateThePrize(prize)" class="fas fa-pen fa-lg"></i>
          </td>
        </tr>
        <tr v-show="!prizes">
          <td class="align-middle" colspan="4" id="users-info">
            THERE'RE NO PRIZES
          </td>
        </tr>
      </tbody>
    </table>
    <form>
      <div class="form-group">
        <label for="name" class="form-label">NAME</label>
        <input
          type="text"
          class="form-control"
          id="prize-name"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="number-of-hits" class="form-label">NUMBER OF HITS</label>
        <input
          type="number"
          class="form-control"
          id="number-of-hits"
          v-model="numOfHits"
          @change="checkValue($event)"
        />
      </div>
      <br />
      <button
        type="button"
        class="btn btn-danger"
        id="reset"
        @click="resetForm"
      >
        CANCEL
      </button>
      <button
        type="button"
        class="btn btn-success send"
        v-if="!prizeUpdate"
        @click="create"
      >
        CREATE
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-if="loadingStatus"
        ></span>
      </button>
      <button
        type="button"
        class="btn btn-success send"
        v-if="prizeUpdate"
        @click="update"
      >
        UPDATE
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-if="loadingStatus"
        ></span>
      </button>
    </form>
  </div>
  <br />
  <div class="response">{{ response }}</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  nema: "Prizes",
  data() {
    return {
      prizeId: null,
      name: null,
      numOfHits: 1,
      prizeUpdate: false,
    };
  },
  async created() {
    await this.getAllPrizes();
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions([
      "clearTheMessage",
      "getAllPrizes",
      "createPrize",
      "updatePrize",
      "deletePrize",
    ]),
    updateThePrize(prize) {
      this.prizeUpdate = true;
      (this.prizeId = prize.prizeId), (this.name = prize.name);
      this.numOfHits = prize.numberOfHits;
    },
    async create() {
      await this.createPrize({
        prizeId: "00000000-0000-0000-0000-000000000000",
        name: this.name,
        numberOfHits: this.numOfHits,
      });
      this.resetForm();
    },
    async update() {
      await this.updatePrize({
        prizeId: this.prizeId,
        name: this.name,
        numberOfHits: this.numOfHits,
      });
      this.resetForm();
    },
    async deleteThePrize(prizeId) {
      await this.deletePrize(prizeId);
    },
    checkValue(e) {
      if (e.target.value > 7) return (this.numOfHits = 7);
      if (e.target.value < 1) return (this.numOfHits = 1);
      this.numOfHits = e.target.value;
    },
    resetForm() {
      this.prizeId = null;
      this.name = null;
      this.numOfHits = 1;
      this.prizeUpdate = false;
    },
  },
  computed: {
    ...mapGetters(["loadingStatus", "prizes", "response"]),
  },
};
</script>

<style scoped>
button {
  margin: 0 5px 7px 5px;
}

.fa-trash {
  color: coral;
}

.fa-trash:hover {
  cursor: pointer;
  color: #ffc3ae;
}

.fa-pen {
  color: lightseagreen;
}

.fa-pen:hover {
  cursor: pointer;
  color: #95fff9;
}

#trash-icon {
  border-top-width: 1px;
}

.table-header {
  color: ivory;
  background-color: #1e847f;
}

h3 {
  margin-top: 15px;
  font-weight: bold;
}

label {
  margin: 10px 0 0 0 !important;
  font-size: 18px;
  font-weight: bolder;
}

input {
  width: 90%;
  border: none;
  border-bottom: 1px solid #006699;
  margin: 0 auto;
  padding: 5px 5px;
  text-align: center;
  font-weight: bold;
}

table,
form {
  border: 2px solid #2c3e50;
  background-color: rgba(255, 255, 255, 0.637);
  -webkit-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.75);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.send:hover {
  font-weight: bold;
  color: #1e847f;
  background-color: white;
  border: 1px solid #1e847f;
}

#reset:hover {
  font-weight: bold;
  color: #dc3545;
  background-color: white;
  border: 1px solid #dc3545;
}
</style>
