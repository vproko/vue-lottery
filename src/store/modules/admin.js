import axios from "axios";

const state = {
  administrator: false,
  users: [],
  session: {},
  sessionStartDate: null,
  sessionEndDate: null,
  tickets: [],
  prizes: [],
};

const getters = {
  adminStatus: (state) => state.administrator,
  activeSession: (state) => state.session,
  sessionStartDate: (state) => state.sessionStartDate,
  sessionEndDate: (state) => state.sessionEndDate,
  sessionTickets: (state) => state.tickets,
  usersList: (state) => state.users,
  prizes: (state) => state.prizes,
};

const mutations = {
  setAdminTrue: (state) => (state.administrator = true),
  setAdminFalse: (state) => (state.administrator = false),
  setSession: (state, payload) => (state.session = { ...payload }),
  clearSession: (state) => (state.session = {}),
  setSessionStartDate: (state, payload) => (state.sessionStartDate = payload),
  clearSessionStartDate: (state) => (state.sessionStartDate = null),
  setSessionEndDate: (state, payload) => (state.sessionEndDate = payload),
  clearSessionEndDate: (state) => (state.sessionEndDate = null),
  setTickets: (state, payload) => (state.tickets = [...payload]),
  clearTickets: (state) => (state.session = []),
  setUsers: (state, payload) => (state.users = [...payload]),
  clearUsers: (state) => (state.users = []),
  setPrizes: (state, payload) => (state.prizes = [...payload]),
  clearPrizes: (state) => (state.prizes = []),
};

const actions = {
  async registerAdmin(context, admin) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/admin/register`,
        admin,
        { headers: { Authorization: "Bearer " + this.state.user.token } }
      );
      context.commit("setMessage", response.data);
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async deleteUserById(context, userId) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/admin/delete/?userId=${userId}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + this.state.user.token,
          },
        }
      );
      context.commit("setMessage", response.data);
      await context.dispatch("getUsersList");
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async checkActiveSession(context) {
    context.commit("setLoading");
    context.dispatch("clearSessionInfo");
    try {
      const response = await axios.get(
        "http://localhost:54637/api/user/session/active"
      );
      context.commit("setSession", response.data);
      context.commit(
        "setSessionStartDate",
        response.data.startDate.replace(/-/g, "/").slice(0, 10)
      );
      context.commit(
        "setSessionEndDate",
        response.data.endDate.replace(/-/g, "/").slice(0, 10)
      );
      context.commit("setTickets", response.data.tickets);
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async startSession(context) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/admin/session`,
        null,
        {
          headers: { Authorization: "Bearer " + this.state.user.token },
        }
      );
      await context.dispatch("setSessionInfo", response.data);
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async endSession(context) {
    context.commit("setLoading");
    try {
      await axios.post(
        `http://localhost:54637/api/admin/end?sessionId=${this.state.admin.session.sessionId}`,
        null,
        { headers: { Authorization: "Bearer " + this.state.user.token } }
      );
      await context.dispatch("clearSessionInfo");
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  setSessionInfo(context, session) {
    return new Promise((resolve) => {
      context.commit("setSession", session);
      context.commit(
        "setSessionStartDate",
        session.startDate.replace(/-/g, "/").slice(0, 10)
      );
      context.commit(
        "setSessionEndDate",
        session.endDate.replace(/-/g, "/").slice(0, 10)
      );
      context.commit("setTickets", session.tickets);
      resolve();
    });
  },
  clearSessionInfo(context) {
    return new Promise((resolve) => {
      context.commit("clearSession");
      context.commit("clearSessionStartDate");
      context.commit("clearSessionEndDate");
      context.commit("clearTickets");
      resolve();
    });
  },
  async drawing(context, draw) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/admin/draw`,
        draw,
        {
          headers: { Authorization: "Bearer " + this.state.user.token },
        }
      );
      context.commit("setMessage", response.data);
      await context.dispatch("checkActiveSession");
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async getAllPrizes(context) {
    context.commit("setLoading");
    try {
      const response = await axios.get(
        `http://localhost:54637/api/admin/prizes`,
        { headers: { Authorization: "Bearer " + this.state.user.token } }
      );
      context.commit("setPrizes", [
        ...response.data.sort((a, b) =>
          a.numberOfHits < b.numberOfHits ? 1 : -1
        ),
      ]);
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async createPrize(context, prize) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/admin/prize/create`,
        prize,
        { headers: { Authorization: "Bearer " + this.state.user.token } }
      );
      await context.dispatch("getAllPrizes");
      context.commit("setMessage", response.data);
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async updatePrize(context, prize) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/admin/prize/update`,
        prize,
        { headers: { Authorization: "Bearer " + this.state.user.token } }
      );
      await context.dispatch("getAllPrizes");
      context.commit("setMessage", response.data);
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async deletePrize(context, prizeId) {
    context.commit("setLoading");
    try {
      const response = await axios.post(
        `http://localhost:54637/api/admin/prize/delete/?prizeId=${prizeId}`,
        null,
        { headers: { Authorization: "Bearer " + this.state.user.token } }
      );
      await context.dispatch("getAllPrizes");
      context.commit("setMessage", response.data);
    } catch (error) {
      context.commit("setMessage", error.response.data);
    }
    context.commit("clearLoading");
  },
  async getUsersList(context) {
    context.commit("setLoading");
    try {
      const response = await axios.get(
        "http://localhost:54637/api/admin/users",
        { headers: { Authorization: "Bearer " + this.state.user.token } }
      );
      context.commit("setUsers", response.data);
    } catch (error) {
      context.commit("setMessage", error.response);
    }
    context.commit("clearLoading");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
