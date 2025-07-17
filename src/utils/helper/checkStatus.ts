import { showFailToast } from 'vant'
/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatusZN = (status: number) => {
  switch (status) {
    case 400:
      showFailToast("请求失败！请您稍后重试");
      break;
    case 401:
      showFailToast("登录失效！请您重新登录");
      break;
    case 403:
      showFailToast("当前账号无权限访问！");
      break;
    case 404:
      showFailToast("你所访问的资源不存在！");
      break;
    case 405:
      showFailToast("请求方式错误！请您稍后重试");
      break;
    case 408:
      showFailToast("请求超时！请您稍后重试");
      break;
    case 409:
      showFailToast("token不存在");
      break;
    case 500:
      showFailToast("服务异常！");
      break;
    case 502:
      showFailToast("网关错误！");
      break;
    case 503:
      showFailToast("服务不可用！");
      break;
    case 504:
      showFailToast("网关超时！");
      break;
    default:
      showFailToast("请求失败！");
  }
};

export const checkStatusEN = (status: number) => {
  switch (status) {
    case 400:
      showFailToast("Request failed! Please try again later.");
      break;
    case 401:
      showFailToast("Login expired! Please log in again.");
      break;
    case 403:
      showFailToast("Current account has no access permission!");
      break;
    case 404:
      showFailToast("The resource you are trying to access does not exist!");
      break;
    case 405:
      showFailToast("Request method is incorrect! Please try again later.");
      break;
    case 408:
      showFailToast("Request timeout! Please try again later.");
      break;
    case 409:
      showFailToast("Token does not exist.");
      break;
    case 500:
      showFailToast("Service exception!");
      break;
    case 502:
      showFailToast("Gateway error!");
      break;
    case 503:
      showFailToast("Service unavailable!");
      break;
    case 504:
      showFailToast("Gateway timeout!");
      break;
    default:
      showFailToast("Request failed!");
  }
};

