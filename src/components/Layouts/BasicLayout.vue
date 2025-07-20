<template>
  <a-layout class="full-height-layout">
    <a-layout-header class="header">
      <Navbar />
    </a-layout-header>
    <a-layout-content class="main-content">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer class="footer" v-if="!$route.meta.hideFooter && !$route.meta.hideLayout">
      <FooterInfo></FooterInfo>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Layouts/navbar/index.vue';
import FooterInfo from '@/components/Layouts/footer/index.vue';
import {useRoute} from "vue-router";
import {useGlobalStore} from "@/stores/modules/global.ts";
const $route = useRoute();
const globalStore = useGlobalStore();
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
  margin-bottom: 64px; /* 确保内容不会被footer遮挡 */
  padding: 20px;
  overflow-y: auto; /* 允许内容滚动 */
  height: calc(100vh - 128px); /* 减去header和footer的高度 */
  box-sizing: border-box;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  text-align: center;
  padding: 10px 0;
  z-index: 999;
  box-shadow: 0 -2px 8px 0 rgba(60,80,120,0.04);
}
</style>
