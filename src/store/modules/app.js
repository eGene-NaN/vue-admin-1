const state = {
  isCollapse: JSON.parse(window.sessionStorage.getItem("isCollapse")) || false,
};

const getters = {
  isCollapse: (state) => state.isCollapse,
};

const mutations = {
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
