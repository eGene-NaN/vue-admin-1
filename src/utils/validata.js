/**
 * 过滤特殊字符
 * @param {*} str 
 */
export function stripscript(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{ }【】‘；：”“'。，、？]");
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

/**
 * 验证邮箱
 * @param {*} value 
 */
export function validataMail(value) {
  let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  return !reg.test(value) ? true : false;
  // if (!reg.test(value)) {
  //   return true;
  // } else {
  //   return false;
  // }
}

/**
 * 验证密码
 * @param {*} value 
 */
export function validataPassword(value) {
  let reg = /(?!^bai\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,20}/;
  return !reg.test(value) ? true : false;
}

/**
 * 验证验证码
 * @param {*} value 
 */
export function validataCode(value) {
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}