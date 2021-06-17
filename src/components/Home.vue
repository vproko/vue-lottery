<template>
  <div class="container-fluid">
    <h3 id="title">WELCOME TO LO<sub>TT</sub>ERY</h3>
    <form>
      <input
        @input="check"
        class="form-control"
        type="number"
        name="num1"
        id="num1"
        v-model.number="numbers.num1"
      />
      <input
        @input="check"
        class="form-control"
        type="number"
        name="num2"
        id="num2"
        v-model.number="numbers.num2"
      />
      <input
        @input="check"
        class="form-control"
        type="number"
        name="num3"
        id="num3"
        v-model.number="numbers.num3"
      />
      <input
        @input="check"
        class="form-control"
        type="number"
        name="num4"
        id="num4"
        v-model.number="numbers.num4"
      />
      <input
        @input="check"
        class="form-control"
        type="number"
        name="num5"
        id="num5"
        v-model.number="numbers.num5"
      />
      <input
        @input="check"
        class="form-control"
        type="number"
        name="num6"
        id="num6"
        v-model.number="numbers.num6"
      />
      <input
        @input="check"
        class="form-control"
        type="number"
        name="num7"
        id="num7"
        v-model.number="numbers.num7"
      />
      <br />
      <button
        @click.prevent="checkLuckyNumbers"
        type="submit"
        class="btn btn-success"
      >
        CHECK
      </button>
      <br />
      <br />
      <div class="response">{{ response }}</div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      title: "Home",
      numbers: {
        num1: 1,
        num2: 2,
        num3: 3,
        num4: 4,
        num5: 5,
        num6: 6,
        num7: 7,
      },
    };
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions(["setTheMessage", "clearTheMessage", "checkNumbers"]),
    check(e) {
      if (parseInt(e.target.value) < 1) return (this[e.target.name] = 1);
      if (parseInt(e.target.value) > 37) return (this[e.target.name] = 37);
      this[e.target.name] = e.target.value;
    },
    checkForEmptyInput() {
      return new Promise((resolve) => {
        const result = Object.values(this.numbers).some((x) => x === "")
          ? true
          : false;
        resolve(result);
      });
    },
    checkForDuplicates() {
      return new Promise((resolve) => {
        const numbers = Object.values(this.numbers).map((x) => parseInt(x));
        const result = [...new Set(numbers)].length < 7 ? true : false;
        resolve(result);
      });
    },
    async checkLuckyNumbers() {
      await this.clearTheMessage();
      if (await this.checkForEmptyInput())
        return await this.setTheMessage("Don't leave empty fields");
      if (await this.checkForDuplicates())
        return await this.setTheMessage("Remove the duplicates");
      await this.checkNumbers(
        Object.values(this.numbers)
          .sort((a, b) => a - b)
          .join(", ")
          .toString()
      );
    },
  },
  computed: {
    ...mapGetters(["response"]),
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

button {
  margin-top: 30px;
}

button:hover {
  font-weight: bold;
  color: #1e847f;
  background-color: white;
  border: 1px solid #1e847f;
}

#title {
  margin: 70px 0 50px 0;
  font-size: 35px;
}

sub {
  font-size: 35px;
}
</style>
