import { createRouter, createWebHistory} from 'vue-router'
import { useUserStoreWithout } from '@/stores/modules/user';

import HomePage from '@/pages/home/index.vue'
import AboutPage from '@/pages/about/index.vue'
import LoginPage from '@/pages/user/login/index.vue'
import RegisterPage from '@/pages/user/register/index.vue'
import UserManagePage from '@/pages/userManage/index.vue'
import PictureManagePage from '@/pages/pictureManage/index.vue'
import PictureManageDetailPage from '@/pages/pictureManage/detail.vue'
import UploadPage from '@/pages/addPicture/index.vue'
import UserProfilePage from '@/pages/user/profile/index.vue'
import UserSpacePage from '@/pages/user/space/index.vue'

 export const routes = [
    {path: '/', component: HomePage, meta: { title: '主页' }},
    {path: '/about', component: AboutPage, meta: { title: '关于' }},
    {path: '/user/login', component: LoginPage, meta: { title: '登录', hideInMenu: true, hideFooter: true, hideLayout: true }},
    {path: '/user/register', component: RegisterPage, meta: { title: '注册', hideInMenu: true, hideFooter: true, hideLayout: true }},
    {path: '/user/profile', component: UserProfilePage, meta: { title: '个人信息', hideInMenu: true, hideFooter: true }},
    {path: '/pictureManage/detail', component: PictureManageDetailPage, meta: { title: '图片详情', hideInMenu: true, hideFooter: true }},
    {path: '/userManage', component: UserManagePage, meta: { title: '用户管理', permission: 'admin' }},
    {path: '/pictureManage', component: PictureManagePage, meta: { title: '图片管理', permission: ['admin'] }},
    {path: '/addPicture', component: UploadPage, meta: { title: '创建图片', permission: ['admin', 'user'] }},
    {path: '/user/space', component: UserSpacePage, meta: { title: '个人空间', permission: ['admin', 'user'] }},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 路由守卫：自动拉取用户信息+权限拦截
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStoreWithout();
    const meta = to.meta;
    
    // 检查是否需要登录
    const needLogin = meta.permission || meta.needLogin;
    
    if (needLogin) {
        // 如果本地没有用户信息，尝试从服务器获取
        if (!userStore.checkLoginStatus()) {
            try {
                await userStore.fetchUserInfo();
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                // 获取用户信息失败，跳转到登录页
                if (to.path !== '/user/login' && to.path !== '/user/register') {
                    const redirectUrl = encodeURIComponent(to.fullPath);
                    return next(`/user/login?redirect=${redirectUrl}`);
                }
            }
        }
        
        // 权限校验
        if (meta.permission) {
            const permission = meta.permission as string | string[];
            const hasPermission = userStore.hasPermission(permission);
            if (!hasPermission) {
                // 无权限，跳转到主页或显示错误页面
                return next('/');
            }
        }
    }
    
    next();
});

export default router