import Vue from "vue";
import SvgIcon from "./SvgIcon.vue";

Vue.component("svg-icon", SvgIcon);

/**
 * require.context(),读取指定目录的所有文件
 * 第一个参数：目录
 * 第二个参数：是否遍历子目录
 * 第三个参数：定义遍历文件规则
 */
const req = require.context("./svg", false, /\.svg$/);
// ES6写法
const requireAll = (requireContext) => {
  // console.log(requireContext.keys().map(requireContext));
  return requireContext.keys().map(requireContext);
};

// ES5写法
// const requireAll = function(requireContext) {
//   return requireContext.keys().map(requireContext);
// };
requireAll(req);
