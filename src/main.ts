import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import './style.css';
import router from './router';
import Antd from 'ant-design-vue';
import pinia from './stores'
import { createApp } from 'vue'
const app = createApp(App)
app.use(Antd)
app.use(pinia)  // ✅ 挂载 pinia
app.use(router)
app.mount('#app');
