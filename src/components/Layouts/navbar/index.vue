<template>
  <a-row :wrap="false" class="navbar">
    <a-col flex="100px" class="navbar-logo-area" @click="goHome" style="cursor:pointer;">
      <img src="@/assets/images/logo.png" class="navbar-logo" alt="logo" />
      <span class="navbar-title">龙琪图库</span>
    </a-col>
    <a-col flex="auto">
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="menuItems" @click="handleClick"/>
    </a-col>
    <a-col flex="100px">
      <a-dropdown v-if="isLoggedIn">
        <div>
          <a-avatar src="https://www.antdv.com/assets/logo.1ef800a8.svg"/>
          <span> {{ userStore.userInfo.userAccount }}</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a  @click="handleProfile" href="/user/profile">个人信息</a>
            </a-menu-item>
            <a-menu-item>
              <a  @click="handleSpace" href="/user/space">我的空间</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="handleLogout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-button type="primary" @click="handleLogin" v-if="!isLoggedIn">登录</a-button>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import {useRouter} from "vue-router";
import {useUserStoreWithout} from "@/stores/modules/user.ts";
import {userLogoutUsingPost} from "@/api/userController.ts";
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';

const current = ref<string[]>(['/']);
const userStore = useUserStoreWithout();
const router = useRouter();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const menuItems = computed(() => {
  const routes = router.getRoutes()
      .filter(route => {
        if (!route.meta?.title) return false;
        if (route.meta.hideInMenu) return false;
        const required = route.meta.permission;
        if (!required) return true;
        if (Array.isArray(required)) {
          return required.includes(userStore.userInfo.userRole);
        }
        return userStore.userInfo.userRole === required;
      });
  // 把关于(about)菜单项移到最后
  const aboutIndex = routes.findIndex(route => route.path === '/about');
  let aboutRoute;
  if (aboutIndex !== -1) {
    aboutRoute = routes.splice(aboutIndex, 1)[0];
  }
  const items = routes.map(route => ({
    key: route.path,
    label: String(route.meta.title),
    title: String(route.meta.title),
  }));
  if (aboutRoute) {
    items.push({
      key: aboutRoute.path,
      label: String(aboutRoute.meta.title),
      title: String(aboutRoute.meta.title),
    });
  }
  return items;
});

const handleLogin = () => {
  router.push('/user/login');
};
const handleProfile = () => {
  router.push('/user/profile');
}
const handleSpace = () => {
  router.push('/user/space');
}
const handleClick = (info: MenuInfo) => {
  current.value = [String(info.key)];
  router.push(String(info.key));
};
const handleLogout = async () => {
  await userStore.logout();
  await userLogoutUsingPost();
  await router.push('/user/login');
  window.location.reload();
}
router.afterEach(() => {
  current.value = [router.currentRoute.value.path];
});

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.7);
  transition: background 0.3s, backdrop-filter 0.3s;
  box-shadow: 0 2px 8px 0 rgba(60,80,120,0.04);
}
.navbar-logo-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar-logo {
  width: 32px;
  height: 32px;
  margin-right: 8px;
  display: block;
  border-radius: 50%;
}

</style>
