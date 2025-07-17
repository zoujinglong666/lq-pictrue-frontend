import { createRouter, createWebHistory} from 'vue-router'

import HomePage from '@/pages/home/index.vue'
import AboutPage from '@/pages/about/index.vue'
import LoginPage from '@/pages/user/login/index.vue'
import RegisterPage from '@/pages/user/register/index.vue'
import UserManagePage from '@/pages/userManage/index.vue'
import PictureManagePage from '@/pages/pictureManage/index.vue'
import UploadPage from '@/pages/upload/index.vue'

const routes = [
    {path: '/', component: HomePage},
    {path: '/about', component: AboutPage},
    {path: '/user/login', component: LoginPage},
    {path: '/user/register', component: RegisterPage},
    {path: '/userManage', component: UserManagePage},
    {path: '/pictureManage', component: PictureManagePage},
    {path: '/upload', component: UploadPage},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router