<template>
  <div class="container-fluid">
    <h3>DRAW</h3>
    <div class="row justify-content-center">
      <div class="num">{{ num1 }}</div>
      <div class="num">{{ num2 }}</div>
      <div class="num">{{ num3 }}</div>
      <div class="num">{{ num4 }}</div>
      <div class="num">{{ num5 }}</div>
      <div class="num">{{ num6 }}</div>
      <div class="num">{{ num7 }}</div>
    </div>
    <br />
    <button
      @click.prevent="draw"
      type="button"
      class="btn btn-success"
      :disabled="!sessionStartDate"
    >
      DRAW
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        v-if="loadingStatus"
      ></span>
    </button>
    <br />
    <br />
    <div class="response">{{ response }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Draw",
  data() {
    return {
      num1: null,
      num2: null,
      num3: null,
      num4: null,
      num5: null,
      num6: null,
      num7: null,
    };
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions(["clearTheMessage", "drawing"]),
    drawNumbers() {
      return new Promise((resolve) => {
        let counter = 0,
          numbers = [];
        while (counter < 7) {
          let element = Math.ceil(Math.random() * 37);
          if (numbers.indexOf(element) === -1) {
            numbers.push(element);
            counter++;
          }
        }
        resolve(numbers);
      });
    },
    displayNumbers(numbers) {
      return new Promise((resolve) => {
        const sorted = numbers.sort((a, b) => a - b);
        let counter = 0;
        const display = setInterval(() => {
          if (counter < 7) {
            this["num" + (counter + 1)] = sorted[counter];
            counter++;
          } else {
            resolve(clearInterval(display));
          }
        }, 700);
      });
    },
    async draw() {
      const numbers = await this.drawNumbers();
      await this.displayNumbers(numbers);
      await this.drawing({
        DrawId: "00000000-0000-0000-0000-000000000000",
        Date: new Date(),
        DrawnNumbers: numbers
          .sort((a, b) => a - b)
          .join(", ")
          .toString(),
        SessionId: "00000000-0000-0000-0000-000000000000",
      });
    },
  },
  computed: {
    ...mapGetters(["sessionStartDate", "response", "loadingStatus"]),
  },
};
</script>

<style scoped>
h3 {
  margin-top: 30px;
  font-weight: bold;
}

.num {
  display: inline-block;
  font-size: 63px;
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

button:hover {
  font-weight: bold;
  color: #1e847f;
  background-color: white;
  border: 1px solid #1e847f;
}

#result {
  margin-top: 30px;
  color: #1e847f;
  font-size: 37px;
  font-weight: bolder;
  text-shadow: 0px 0px 3px #2c3e50;
}

button:disabled {
  cursor: not-allowed;
}
</style>
