import api from "..";

/**
 *
 * 用户表
 */
interface ILogin {
  phone: string;
  password: string;
}

/**
 *
 * 登录方法
 * @export
 * @param {ILogin} user
 * @return {*}
 */
export function loginApi(user: ILogin) {
  return api({
    method: "POST",
    url: "/auth/login",
    data: user,
  });
}

/**
 *
 * 注册方法
 * @export
 * @param {ILogin} user
 * @return {*}
 */
export function registApi(user: ILogin) {
  return api({
    method: "POST",
    url: "/auth/regist",
    data: user,
  });
}

/**
 *
 * 获取验证码方法
 */
export function captchaApi(id?: string) {
  id = id ? id : "-1";
  return api({
    method: "GET",
    url: "/auth/captcha/" + id,
  });
}

/**
 *
 * 验证验证码方法
 */
export function verifyApi(captcha: { captcha: string; id: string }) {
  return api({
    method: "POST",
    url: "/auth/captcha/",
    data: captcha,
  });
}
