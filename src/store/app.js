const app = {
  state: {
    isCollapse:
      JSON.parse(window.sessionStorage.getItem("isCollapse")) || false,
  },
  getters: {
    isCollapse: (state) => state.isCollapse,
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      window.sessionStorage.setItem(
        "isCollapse",
        JSON.stringify(state.isCollapse)
      );
    },
  },
  actions: {
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
  },
};

export default app;
