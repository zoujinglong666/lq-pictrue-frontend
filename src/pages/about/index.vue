<script setup lang="ts">
import Logo from "@/assets/images/logo.png";
const githubUrl = 'https://github.com/your-org/lq-pictrue-frontend';
</script>

<template>
  <div class="about-root">
    <div class="about-card">
      <div class="about-logo">
        <img :src="Logo" alt="logo" class="about-logo-img" />
        <span class="about-title">龙琪图库</span>
      </div>
      <h2 class="about-heading">关于我们</h2>
      <p class="about-desc">
        龙琪图库是一个专注于图片内容管理与分享的现代化平台，致力于为用户提供高效、便捷、美观的图片上传、浏览、管理与检索体验。
      </p>
      <ul class="about-list">
        <li>🖼️ 支持多图上传、图片分类、标签筛选、模糊搜索</li>
        <li>🔍 首页瀑布流浏览，骨架屏、进度条、图片加载动画</li>
        <li>👤 用户注册、登录、权限管理，支持管理员与普通用户分级</li>
        <li>🛡️ 全局 Loading、自动登录状态管理、自动登出与权限拦截</li>
        <li>⚡ 响应式布局，适配桌面与移动端，极简美观的 UI 风格</li>
        <li>🛠️ 技术栈：Vue3 + Vite + Pinia + Ant Design Vue + dayjs + TypeScript</li>
      </ul>
      <div class="about-github">
        <span>项目开源地址：</span>
        <a :href="githubUrl" target="_blank" rel="noopener" class="about-link">{{ githubUrl }}</a>
      </div>
      <div class="about-footer">
        <span>© 2024 龙琪图库 | 由 zou123 & contributors 设计与开发</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-root {

}
.about-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(60,80,120,0.10);
  padding: 48px 36px 32px 36px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.about-logo {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}
.about-logo-img {
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 50%;
  background: #f6f8fa;
}
.about-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: 2px;
}
.about-heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #2a3a4a;
  text-align: center;
}
.about-desc {
  color: #555;
  font-size: 1.08rem;
  margin-bottom: 18px;
  text-align: center;
}
.about-list {
  color: #444;
  font-size: 1rem;
  margin-bottom: 20px;
  padding-left: 1.2em;
  line-height: 1.8;
}
.about-github {
  margin-bottom: 18px;
  font-size: 1rem;
  color: #888;
  word-break: break-all;
}
.about-link {
  color: #2563eb;
  text-decoration: underline;
  font-weight: 500;
}
.about-footer {
  color: #b0b8c8;
  font-size: 0.95rem;
  margin-top: 12px;
  text-align: center;
}
@media (max-width: 600px) {
  .about-card {
    padding: 24px 8px 16px 8px;
    max-width: 98vw;
  }
  .about-logo-img {
    width: 36px;
    height: 36px;
  }
  .about-title {
    font-size: 1.3rem;
  }
}
</style>