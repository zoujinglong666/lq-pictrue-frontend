<template>
  <a-layout class="full-height-layout">
    <a-layout-header class="header">
      <Navbar />
    </a-layout-header>
    <a-layout-content class="main-content">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer class="footer">
      <FooterInfo></FooterInfo>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Layouts/navbar/index.vue';
import FooterInfo from '@/components/Layouts/footer/index.vue';
</script>

<style scoped>
.full-height-layout {
  min-height: 100vh; /* 最小高度为100vh */
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10; /* 保证header在最上层 */
  background-color: #fff;
}

.main-content {
  flex: 1; /* 中间内容自适应 */
  margin-top: 64px; /* 确保内容不会被header遮挡，64px是ant design默认header的高度 */
  margin-bottom: 64px; /* 确保内容不会被footer遮挡 */
  padding: 20px; /* 可以根据需要调整 */
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  text-align: center;
  padding: 10px 0;
}
</style>
