import service from "@/utils/request.js";
/**
 * 获取验证码
 */
export function GetSms(requestData) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data: {
      username: requestData.username,
      module: requestData.module
    }
  })
}

/**
 * 获取用户角色
 */

/**
 *
 */