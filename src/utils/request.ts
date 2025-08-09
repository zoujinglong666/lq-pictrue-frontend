import axios from "axios";
import { message } from "ant-design-vue";
import {useUserStore} from "@/stores/modules/user.ts";

// 环境变量配置
const ENV_CONFIG: { [key: string]: string } = {
    development: "http://localhost:8123",  // 开发环境
    production: "https://api.yourdomain.com"  // 生产环境
};

// 获取 BASE_URL，确保环境变量存在
const BASE_URL = ENV_CONFIG[import.meta.env.MODE] || ENV_CONFIG.development;

// 创建 Axios 实例
const httpClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true,

});
export interface ApiResponse<T = any> {
    code: number;          // 业务状态码，例如 20000 成功，40000 参数错误，40100 未登录等
    data: T;               // 实际的数据内容
    message: string;       // 说明信息或错误提示
}
// 检查用户是否登录
const checkLogin = (response:ApiResponse) => {
    const { data } = response;
    if (data.code === 40100||data.code === 40101) {
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/user/login') && !currentPath.includes('/user/get/login')) {
            message.warning('请先登录');
            const userStore = useUserStore();
            userStore.logout();
            window.location.href = `/user/login?redirect=${encodeURIComponent(window.location.href)}`;
        }
    }
};

// 全局请求拦截器
httpClient.interceptors.request.use(
    (config) => {
        // 可以在这里进行一些请求的处理，例如加上token等
        const userStore = useUserStore();
        const token = userStore.userInfo?.token;
        if (token) {
            config.headers['satoken'] =`Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 请求错误时，可以统一处理，比如弹出提示
        message.error("请求错误，请稍后再试");
        return Promise.reject(error);
    }
);

// 全局响应拦截器
httpClient.interceptors.response.use(
    (response) => {
        checkLogin(response as unknown as ApiResponse);  // 提取成函数，保持代码简洁
        return response.data;  // 直接返回响应数据，减少冗余
    },
    (error) => {
        // 响应错误处理
        let errorMessage = '网络错误';
        if (error.response) {
            const responseData = error.response.data;
            errorMessage = responseData.message || `状态码: ${error.response.status}`;
        }
        message.error(`请求失败: ${errorMessage}`);
        return Promise.reject(error);
    }
);

export default httpClient;
