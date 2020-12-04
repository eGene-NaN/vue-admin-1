import router from "./router.js";
import { getToken } from "@/utils/app.js";

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
    // 路由动态添加，分配菜单，为每个角色分配不同的菜单
    console.log("token存在");
  } else {
    console.log("token不存在");
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
