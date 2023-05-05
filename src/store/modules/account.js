import api from "../../api/index";

const state = {
  account: null,
  session: null,
};

const actions = {
  signup: async ({ commit }, { name, email, password, first_name, last_name, phone }) => {
    try {
      const account = await api.createAccount(email, password, name, phone);
      await api.createSession(email, password);
      await api.createAccountMeta(Server.authCollectionID, {
        user_id: account.$id,
        first_name,
        last_name,
      }, account.$id,);
      commit("setAccount", account);
    } catch (e) {
      console.log("Error creating Account");
      commit(
        "setError",
        {
          show: true,
          message: e.message,
          color: "red",
        },
        { root: true }
      );
    }
  },
  fetchAccount: async ({ commit }) => {
    try {
      const account = await api.getAccount();
      commit("setAccount", account);
    } catch (e) {
      console.log("Error getting Account", e);
    }
  },
  login: async ({ commit }, { email, password }) => {
    try {
      console.log(email, password);
      await api.createSession(email, password);
      const account = await api.getAccount();
      commit("setAccount", account);
    } catch (e) {
      console.log("Error creating Session", e);
      commit(
        "setError",
        {
          show: true,
          message: e.message,
          color: "red",
        },
        { root: true }
      );
    }
  },
  logout: async ({ commit }) => {
    try {
      await api.deleteCurrentSession();
      commit("setAccount", null);
    } catch (e) {
      console.log("Error deleting session");
      commit(
        "setError",
        {
          show: true,
          message: "Failed to logout",
          color: "red",
        },
        { root: true }
      );
    }
  },
};

const getters = {
  getAccount: (state) => state.account,
  getSession: (state) => state.session,
};

const mutations = {
  setAccount: (state, account) => (state.account = account),
};

export default {
  state,
  actions,
  getters,
  mutations,
};
