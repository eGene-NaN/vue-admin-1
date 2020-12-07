import { Login } from "@/api/login.js";
import { getUserName, setToken, setUserName } from "@/utils/app.js";

const state = {
  token: "",
  username: getUserName() || "",
  isCollapse: JSON.parse(window.sessionStorage.getItem("isCollapse")) || false,
};

const getters = {
  isCollapse: (state) => state.isCollapse,
  username: (state) => state.username,
};

const mutations = {
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  },
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    window.sessionStorage.setItem(
      "isCollapse",
      JSON.stringify(state.isCollapse)
    );
  },
};

const actions = {
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData)
        .then((response) => {
          let data = response.data.data;
          // 普通方式调用
          content.commit("SET_TOKEN", data.token);
          content.commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUserName(data.username);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
