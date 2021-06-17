import { createStore } from "vuex";

import admin from "./modules/admin";
import user from "./modules/user";

export default createStore({
  modules: {
    admin,
    user,
  },
});
