import {defineStore} from "pinia";
import {ref} from "vue";
import pinia from "@/stores";

export const useUserStore = defineStore("user", () => {

    const roles = ref<string[]>([])

    const username = ref<string>("")

    const userInfo = ref<any>({})


    // 获取用户详情
    const getInfo = async () => {

    }


    // 登出
    const logout = () => {
        roles.value = []
        userInfo.value = {}
        username.value = ""

    }

    const setUserInfo = (data: any) => {
        userInfo.value = data
    }
    return {roles, username, getInfo, logout, setUserInfo, userInfo}
}, {
    persist: true,
})

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useUserStoreWithout() {
    return useUserStore(pinia)
}
