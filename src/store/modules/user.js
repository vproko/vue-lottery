import axios from "axios";
import router from "../../router";

const state = {
  logged: false,
  loading: false,
  user: {},
  token: null,
  message: null,
};

const getters = {
  userId: (state) => state.user.userId,
  loginStatus: (state) => state.logged,
  loadingStatus: (state) => state.loading,
  response: (state) => state.message,
};

const mutations = {
  setUserData: (state, payload) => (state.user = { ...payload }),
  clearUserData: (state) => (state.user = {}),
  setToken: (state, payload) => (state.token = payload),
  clearToken: (state) => (state.token = ""),
  setLoggedIn: (state) => (state.logged = true),
  setLoggedOut: (state) => (state.logged = false),
  setUsers: (state, payload) => (state.users = [...payload]),
  clearUsers: (state) => (state.users = []),
  setMessage: (state, payload) => (state.message = payload),
  clearMessage: (state) => (state.message = ""),
  setLoading: (state) => (state.loading = true),
  clearLoading: (state) => (state.loading = false),
};

const actions = {
  async registerUser(context, newUser) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/user/register`,
        newUser
      );
      context.commit("setMessage", response.data);
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async authenticate(context, user) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/user/authenticate`,
        user
      );
      context.commit("setToken", response.data.token);
      context.commit("setUserData", response.data);
      context.commit("setLoggedIn");
      if (response.data.role === "Admin") {
        context.commit("setAdminTrue");
        context.dispatch("getUsersList");
        router.push({ name: "Admin" });
      } else {
        router.push({ name: "Ticket" });
      }
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async updateUserData(context, data) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/user/update`,
        {
          ...data,
          userId: this.state.user.user.userId,
          token: this.state.user.token,
        },
        { headers: { Authorization: "Bearer " + this.state.user.token } }
      );
      context.commit("setUserData", { ...response.data });
      context.commit(
        "setMessage",
        "Your profile has been successfully updated."
      );
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  logout(context) {
    context.commit("clearSession");
    context.commit("clearSessionStartDate");
    context.commit("clearSessionEndDate");
    context.commit("clearTickets");
    context.commit("clearUserData");
    context.commit("clearToken");
    context.commit("clearUsers");
    context.commit("clearPrizes");
    context.commit("clearMessage");
    context.commit("setLoggedOut");
    context.commit("setAdminFalse");
    router.push({ name: "Home" });
  },
  async sendTicket(context, ticket) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/user/ticket`,
        ticket,
        { headers: { Authorization: "Bearer " + this.state.user.token } }
      );
      context.commit("setMessage", response.data);
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async checkNumbers(context, numbers) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/user/check?numbers=${numbers}`
      );
      context.commit(
        "setMessage",
        `Winning numbers: "${response.data.winningNumbers}" You won: ${response.data.prize} Congratulations!`
      );
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  setTheMessage(context, payload) {
    context.commit("setMessage", payload);
  },
  clearTheMessage(context) {
    context.commit("clearMessage");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
