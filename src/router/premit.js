import router from "./router.js";
import store from "../store/index.js";
import { getToken, removeToken, removeUserName } from "@/utils/app.js";

const whiteRouter = ["/login"]; // indexOf 判断数组中是否存在某个指定的对象，如果不存在返回-1

/**
 * 路由卫士
 *
 * to // 要迁移的目标页面
 * from // 迁移前的页面
 * next() // 当路由重新指向时，会重新触发beforeEach
 */
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === "/login") {
      // 清空Cookie
      removeToken();
      removeUserName();
      // 清空store
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      next();
    } else {
      // 路由动态添加，分配菜单，为每个角色分配不同的菜单
      next();
    }
  } else {
    console.log("token不存在");
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
      /**
       * 1.当直接进入到index的时候，参数to就变成了/index，路由指向，此时就会运行beforeEach
       * 2.当再次next("/login")，再次触发路由指向，再次运行beforeEach，参数to变成了/login
       * 3.白名单参数存在，则直接执行next()，没有参数，就不会再出发beforeEach
       */
    }
  }
});
