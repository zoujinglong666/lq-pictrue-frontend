<template>
  <a-layout class="full-height-layout">
    <a-layout-header class="header">
      <Navbar />
    </a-layout-header>
    <a-layout-content class="main-content">
      <router-view></router-view>
    </a-layout-content>
    <div class="footer" v-if="!$route.meta.hideFooter && !$route.meta.hideLayout">
      <FooterInfo></FooterInfo>
    </div>
  </a-layout>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Layouts/navbar/index.vue';
import FooterInfo from '@/components/Layouts/footer/index.vue';
import {useRoute} from "vue-router";
const $route = useRoute();
</script>

<style scoped>
.full-height-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgba(60,80,120,0.04);
}

.main-content {
  flex: 1;
  margin-top: 64px; /* 确保内容不会被header遮挡 */
  padding: 10px;
  overflow-y: auto; /* 允许内容滚动 */
  box-sizing: border-box;
}

.footer {
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  z-index: 999;
}
</style>
