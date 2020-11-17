import axios from "axios";
import { Message } from 'element-ui';

// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_ABC);
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service = axios.create({
  baseURL: BASEURL, // http://localhost:8080/devApi/ = http://www.web-jshtml.cn/productapi
  setTimeout: 10000, // 设置请求的时间，超时的情况就停掉请求
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response);
  let data = response.data;

  if (data.resCode !== 0) {
    Message.error(data.message);
    return Promise.reject(data);
  } else {
    return response;
    // return Promise.resolve;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service;
