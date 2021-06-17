<template>
  <h3>TICKET</h3>
  <form>
    <input
      @input="check"
      class="form-control"
      type="number"
      name="num1"
      id="num1"
      v-model.number="num1"
      :style="isItDisabled()"
      :disabled="!sessionStartDate"
    />
    <input
      @input="check"
      class="form-control"
      type="number"
      name="num2"
      id="num2"
      v-model.number="num2"
      :style="isItDisabled()"
      :disabled="!sessionStartDate"
    />
    <input
      @input="check"
      class="form-control"
      type="number"
      name="num3"
      id="num3"
      v-model.number="num3"
      :style="isItDisabled()"
      :disabled="!sessionStartDate"
    />
    <input
      @input="check"
      class="form-control"
      type="number"
      name="num4"
      id="num4"
      v-model.number="num4"
      :style="isItDisabled()"
      :disabled="!sessionStartDate"
    />
    <input
      @input="check"
      class="form-control"
      type="number"
      name="num5"
      id="num5"
      v-model.number="num5"
      :style="isItDisabled()"
      :disabled="!sessionStartDate"
    />
    <input
      @input="check"
      class="form-control"
      type="number"
      name="num6"
      id="num6"
      v-model.number="num6"
      :style="isItDisabled()"
      :disabled="!sessionStartDate"
    />
    <input
      @input="check"
      class="form-control"
      type="number"
      name="num7"
      id="num7"
      v-model.number="num7"
      :style="isItDisabled()"
      :disabled="!sessionStartDate"
    />
    <br />
    <button
      @click.prevent="send"
      type="submit"
      class="btn btn-success"
      :disabled="!sessionStartDate"
    >
      SEND
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        v-if="loadingStatus"
      ></span>
    </button>
  </form>
  <br />
  <p id="result" class="response" :class="{ 'text-danger': !sessionStartDate }">
    {{ response }}
  </p>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Ticket",
  data() {
    return {
      num1: 1,
      num2: 2,
      num3: 3,
      num4: 4,
      num5: 5,
      num6: 6,
      num7: 7,
    };
  },
  async created() {
    await this.checkActiveSession();
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions([
      "checkActiveSession",
      "setTheMessage",
      "clearTheMessage",
      "sendTicket",
    ]),
    sortNumbers() {
      return new Promise((resolve) => {
        const data = [
          this.num1,
          this.num2,
          this.num3,
          this.num4,
          this.num5,
          this.num6,
          this.num7,
        ]
          .map((x) => parseInt(x))
          .sort((a, b) => a - b);
        resolve(data);
      });
    },
    check(e) {
      if (parseInt(e.target.value) < 1) return (this[e.target.name] = 1);
      if (parseInt(e.target.value) > 37) return (this[e.target.name] = 37);
      this[e.target.name] = e.target.value;
    },
    async send() {
      this.clearTheMessage();
      const numbers = await this.sortNumbers();
      if (numbers.includes("") || numbers.includes(NaN))
        return this.setTheMessage("Don't leave empty fields.");
      if ([...new Set(numbers)].length < 7)
        return this.setTheMessage("Remove the duplicates.");
      await this.sendTicket({
        TicketId: "00000000-0000-0000-0000-000000000000",
        CreateDate: new Date(),
        Numbers: numbers.join(", ").toString(),
        UserId: this.userId,
        SessionId: "00000000-0000-0000-0000-000000000000",
      });
    },
    isItDisabled() {
      return !this.sessionStartDate ? "cursor: not-allowed" : null;
    },
  },
  computed: {
    ...mapGetters(["userId", "sessionStartDate", "response", "loadingStatus"]),
  },
};
</script>

<style scoped>
input {
  font-size: 63px;
  display: inline-block;
  border: 2px solid #2c3e50;
  border-radius: 7px;
  text-align: center;
  width: 100px;
  height: 100px;
  margin: 0.7%;
  font-weight: bolder;
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

input[type="number"] {
  -moz-appearance: textfield;
}

button,
.warning {
  margin-top: 30px;
}
</style>
