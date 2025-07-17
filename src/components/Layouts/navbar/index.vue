<template>
  <a-row :wrap="false" class="navbar">
    <a-col flex="100px">龙琪图库</a-col>
    <a-col flex="auto">
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="handleClick"/>
    </a-col>
    <a-col flex="100px">
      <a-dropdown v-if="userStore.userInfo.userAccount">
        <div>
          <a-avatar src="https://www.antdv.com/assets/logo.1ef800a8.svg"/>
          <span> {{ userStore.userInfo.userAccount }}</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">个人信息</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="handleLogout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-button type="primary" @click="handleLogin" v-if="!userStore.userInfo.userAccount">登录</a-button>
    </a-col>
  </a-row>
</template>


<script lang="ts" setup>
import {computed, h, ref} from 'vue';
import {MailOutlined} from '@ant-design/icons-vue';
import {MenuProps} from 'ant-design-vue';
import {useRouter} from "vue-router";
import {useUserStoreWithout} from "@/stores/modules/user.ts";
import {userLogoutUsingPost} from "@/api/userController.ts";

const current = ref<string[]>(['/']);
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(MailOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/userManage',
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/pictureManage',
    label: '图片管理',
    title: '图片管理',
  },
  {
    key: '/upload',
    label: '创建图片',
    title: '创建图片',
  },
  {
    key: '/about',
    label: '关于',
    title: '关于',
  },
]);
const userStore = useUserStoreWithout();



const handleLogin = () => {
  router.push('/user/login');
};


const router = useRouter();
const handleClick = ({key}) => {
  current.value = [key];
  router.push(key);
};
const handleLogout = async () => {
  await userStore.logout();
  await userLogoutUsingPost()
  await router.push('/user/login');
}
router.afterEach(() => {
  current.value = [router.currentRoute.value.path];
});
</script>


