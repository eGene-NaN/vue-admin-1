import service from "@/utils/request.js";
/**
 * 获取验证码
 */
export function GetSms() {
  service.request({
    method: "post",
    url: "/getSms/",
    data: {
      firstName: "Fred",
      lastName: "Flintstone_wnwnwnwn1123"
    }
  })
}

/**
 * 获取用户角色
 */

/**
 *
 */