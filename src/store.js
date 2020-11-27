import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";

Vue.use(Vuex);

export default new Vuex.Store({
  // state是存储的单一状态，存储的是基本数据
  state: {
    isCollapse:
      JSON.parse(window.sessionStorage.getItem("isCollapse")) || false,
    // JSON.parse(Cookie.get("isCollapse")) || false,
    stateCount: 10,
  },
  // getters是state的计算属性，对state加工，是派生出来的数据
  getters: {
    gettersCount: (state) => {
      return state.stateCount + 10;
    },
    // stateCount: (state) => state.stateCount + 10,
  },

  // 同步的，不需要处理回调
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      console.log(state.isCollapse);

      /**
       * HTML5本地存储，两种存储方式
       *
       * 1.sessionStorage:临时性的存储，关闭浏览器就会被清除掉
       * 2.localStorage:可以长期存储再浏览器中，只可以手动清除才会生效
       *
       * 本地存储最大5M容量，并且只能存储字符串类型
       * 必要时，需要进行类型转换，会用到 JSON.stringify/JSON.parse
       */
      window.sessionStorage.setItem(
        "isCollapse",
        JSON.stringify(state.isCollapse)
      );

      // window.localStorage.setItem(
      //   "isCollapse",
      //   JSON.stringify(state.isCollapse)
      // );

      /**
       * 添加Cookie_js依赖的方式存储
       */
      // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
    },

    SET_COUNT(state, value) {
      state.stateCount = value;
      console.log("store's mutations " + state.stateCount);
    },
  },

  actions: {
    setMenuStatus(content, data) {
      // content.state
      // content.getters
      // content.commit
      // content.rootGetters
      // content.rootState
      console.log("store--actions--start");
      console.log(data);
      content.commit("SET_COLLAPSE");
      console.log("store--actions--end");
    },
  },
});
