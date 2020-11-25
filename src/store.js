import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // state是存储的单一状态，存储的是基本数据
  state: {
    isCollapse: false,
    stateCount: 10,
  },
  // getters是state的计算属性，对state加工，是派生出来的数据
  getters: {
    gettersCount: (state) => {
      return state.stateCount + 10;
    },
    // stateCount: (state) => state.stateCount + 10,
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      console.log(state.isCollapse);
    },

    SET_COUNT(state, value) {
      state.stateCount = value;
      console.log("store's mutations " + state.stateCount);
    },
  },
  actions: {},
});
