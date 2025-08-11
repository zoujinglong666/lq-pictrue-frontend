<script setup lang="ts">
import Logo from "@/assets/images/logo.png";
import { PictureOutlined, SearchOutlined, UserOutlined, SafetyOutlined, ThunderboltOutlined, ToolOutlined } from '@ant-design/icons-vue';

const githubUrl = 'https://github.com/your-org/lq-pictrue-frontend';

const features = [
  { icon: PictureOutlined, title: '多图上传', desc: '支持多图上传、分类、标签筛选、模糊搜索', color: ['#ff9a9e', '#fad0c4'] },
  { icon: SearchOutlined, title: '瀑布流浏览', desc: '骨架屏、进度条、图片加载动画，浏览体验顺畅', color: ['#a18cd1', '#fbc2eb'] },
  { icon: UserOutlined, title: '用户与权限', desc: '注册、登录、权限管理，管理员与普通用户分级', color: ['#fbc2eb', '#a6c1ee'] },
  { icon: SafetyOutlined, title: '全局安全', desc: '全局 Loading、自动登录状态管理与权限拦截', color: ['#fddb92', '#d1fdff'] },
  { icon: ThunderboltOutlined, title: '响应式布局', desc: '适配桌面与移动端，UI 极简美观', color: ['#89f7fe', '#66a6ff'] },
  { icon: ToolOutlined, title: '技术栈', desc: 'Vue3 + Vite + Pinia + Ant Design Vue + TypeScript', color: ['#84fab0', '#8fd3f4'] },
];
</script>

<template>
  <div class="about-root">
    <div class="about-card">
      <div class="about-logo">
        <img :src="Logo" alt="logo" class="about-logo-img" />
        <span class="about-title">龙琪图库</span>
      </div>
      <p class="about-desc">
        龙琪图库是一个专注于图片内容管理与分享的平台，致力于提供高效、美观的图片上传、浏览、管理与检索体验。
      </p>

      <!-- 卡片网格 -->
      <div class="feature-grid">
        <div v-for="(item, index) in features" :key="index" class="feature-card">
          <div class="feature-icon" :style="{ background: `linear-gradient(135deg, ${item.color[0]}, ${item.color[1]})` }">
            <component :is="item.icon" style="font-size: 24px; color: white;" />
          </div>
          <h3 class="feature-title">{{ item.title }}</h3>
          <p class="feature-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-root { display: flex; justify-content: center; padding: 20px; }
.about-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.about-logo { display: flex; align-items: center; margin-bottom: 18px; }
.about-logo-img {
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 50%;
  background: #f6f8fa;
}
.about-title { font-size: 2rem; font-weight: 700; color: #2563eb; letter-spacing: 2px; }
.about-desc { color: #555; font-size: 1.08rem; margin-bottom: 30px; text-align: center; max-width: 800px; }

/* 网格布局 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 30px;
  width: 100%;
}
.feature-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px 20px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}
.feature-card:hover {
  background: #fff;
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}
.feature-icon {
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 auto 14px auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}
.feature-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.feature-desc {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
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

/* 响应式 */
@media (max-width: 900px) {
  .feature-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .feature-grid { grid-template-columns: 1fr; }
  .about-card { padding: 24px 12px; }
  .about-title { font-size: 1.4rem; }
}
</style>
