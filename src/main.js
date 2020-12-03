import Vue from "vue";
//import Vue from "vue/dist/vue.runtime.common.js";
// 以上两者是等价的，更改vue运行模式时需要改变此处
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 自定义全局组件
import "./icons/index.js";

Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

/**
 * Vue3.0有两种运行模式
 * 1.compiler(模板)模式
 * 2.runtime(运行时)模式
 *
 * vue模块默认的为runtime模式，指向的vue依赖包(vue/dist/vue.runtime.common.js)
 * compiler模式，指向的vue依赖包(vue/dist/vue.js)
 *
 * 如果想用到自定义组件，则需要改变vue的运行模式，更改vue.config.js
 */

// runtime(运行时模式)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
