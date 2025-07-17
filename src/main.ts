import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from './router';
import { createApp } from 'vue'
import pinia from './stores'
const app = createApp(App);
app.use(pinia)  // ✅ 挂载 pinia
app.use(router)
app.use(Antd)
app.mount('#app');
