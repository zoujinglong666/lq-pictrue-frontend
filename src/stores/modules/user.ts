import {defineStore} from "pinia";
import {ref} from "vue";
import pinia from "@/stores";
import {userLoginUsingPost, userRegisterUsingPost, userLogoutUsingPost, getLoginUserUsingGet} from '@/api/userController.ts';

// 用户信息类型定义
interface UserInfo {
    id?: number;
    userAccount?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    token?: string;
    createTime?: string;
    updateTime?: string;
}

export const useUserStore = defineStore("user", () => {
    const roles = ref<string[]>([])
    const username = ref<string>("")
    const userInfo = ref<UserInfo>({})
    const isLoggedIn = ref<boolean>(false)


    // 自动拉取当前登录用户信息
    const fetchUserInfo = async () => {
        try {
            const res = await getLoginUserUsingGet();
            console.log('Fetched user info:', res.data)
            if (res?.code === 0 && res?.data) {
                setUserInfo(res.data);
                return res.data.data;
            } else {
                // 获取用户信息失败，清空本地数据
                setUserInfo({});
                throw new Error(res.data?.message || '获取用户信息失败');
            }
        } catch (error) {
            console.error('Fetch user info error:', error);
            setUserInfo({});
            throw error;
        }
    }

    // 获取用户详情（本地）
    const getInfo = async () => {
        return userInfo.value;
    }

    // 登出
    const logout = async () => {
        try {
            await userLogoutUsingPost();
        } catch (error) {
            console.error('Logout API error:', error);
            // 即使API调用失败，也要清空本地数据
        } finally {
            // 清空本地数据
            roles.value = []
            userInfo.value = {}
            username.value = ""
            isLoggedIn.value = false
            localStorage.removeItem('user-store');
            sessionStorage.removeItem('user-store');
        }
    }

    const setUserInfo = (data: UserInfo) => {
        userInfo.value = data
        username.value = data?.userName || ''
        
        // 设置角色
        if (data?.userRole) {
            roles.value = [data.userRole]
        } else {
            roles.value = []
        }
        
        // 设置登录状态
        isLoggedIn.value = !!data?.userAccount
    }

    // 检查是否有权限
    const hasPermission = (requiredRole: string | string[]) => {
        const userRole = userInfo.value?.userRole
        if (!userRole) return false
        
        if (Array.isArray(requiredRole)) {
            return requiredRole.includes(userRole)
        }
        return userRole === requiredRole
    }

    // 检查是否已登录
    const checkLoginStatus = () => {
        return isLoggedIn.value && !!userInfo.value?.userAccount
    }

    return {
        roles, 
        username, 
        getInfo, 
        logout, 
        setUserInfo, 
        userInfo, 
        fetchUserInfo,
        isLoggedIn,
        hasPermission,
        checkLoginStatus
    }
}, {
    persist: {
        key: 'user-store',
        storage: localStorage,
    },
})

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useUserStoreWithout() {
    return useUserStore(pinia)
}
