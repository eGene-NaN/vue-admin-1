import { MessageBox } from "element-ui";

// 全局注册，多文件调用(注册全局方法)
export default {
  install(Vue, options) {
    Vue.prototype.confirm = (params) => {
      MessageBox.confirm(params.content, params.tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: params.type || "warning",
        center: true,
      })
        .then(() => {
          params.fn && params.fn(params.id);
          // if (params.fn) {
          //   params.fn();
          // }

          // root.$message({
          //   type: "success",
          //   message: "删除成功!",
          // });
        })
        .catch(() => {
          // root.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        });
    };
  },
};
