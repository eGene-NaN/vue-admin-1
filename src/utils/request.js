import axios from "axios";
import { Message } from "element-ui";
import { getToken, getUserName } from "@/utils/app.js";

// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_ABC);
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";
const service = axios.create({
  baseURL: BASEURL, // http://localhost:8080/devApi/ = http://www.web-jshtml.cn/productapi
  setTimeout: 10000, // 设置请求的时间，超时的情况就停掉请求
});

/**
 * 请求接口前，做一些数据处理（请求拦截器）
 */
service.interceptors.request.use(
  function(config) {
    // 后台需要前端传的相关参数（在请求头添加参数）
    // console.log(config.headers);
    config.headers["Tokey"] = getToken();
    config.headers["UserName"] = getUserName();
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/**
 * 请求接口后，返回数据进行拦截（响应拦截器）
 */
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // console.log(response);
    let data = response.data;

    if (data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
      // return Promise.resolve;
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
