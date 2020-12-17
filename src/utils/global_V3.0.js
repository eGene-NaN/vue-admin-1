import { MessageBox } from "element-ui";
import { reactive, ref } from "@vue/composition-api";

// VUE3.0 全局方法
export function global() {
  const str = ref("");
  const confirm = (params) => {
    MessageBox.confirm(params.content, params.tip || "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: params.type || "warning",
      center: true,
    })
      .then(() => {
        str.value = "改变方法内的值，返回给调用者"
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
  return {
    str,
    confirm,
  };
}
