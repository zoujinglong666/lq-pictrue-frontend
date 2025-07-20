<template>
  <div class="login-root">
    <div class="login-left">
      <div class="logo-area">
        <img class="logo-img" :src="Logo" alt="logo" />
        <span class="logo-text">龙琪图库</span>
      </div>

    </div>
    <div class="login-right">
      <div class="login-card">
        <h2 class="login-title">注册账号</h2>
        <a-form :model="formState" name="normal_register" class="login-form" @finish="onFinish">
          <a-form-item name="userAccount" :rules="[{ required: true, message: '请输入账号/邮箱' }]">
            <a-input v-model:value="formState.userAccount" placeholder="用户名 / 邮箱" class="input-with-icon">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="userPassword" :rules="[{ required: true, message: '请输入密码' }]">
            <a-input-password v-model:value="formState.userPassword" placeholder="密码" class="input-with-icon">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item name="checkPassword" :rules="[{ required: true, message: '请确认密码' }]">
            <a-input-password v-model:value="formState.checkPassword" placeholder="确认密码" class="input-with-icon">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="login-btn">注册账号</a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="default" class="register-btn" @click="handleGoLogin">去登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {userRegisterUsingPost} from "@/api/userController.ts";
import router from "@/router";
import {message} from 'ant-design-vue';
import Logo from "@/assets/images/logo.png";
const formState = reactive<API.UserRegisterRequest>({
  userPassword: '',
  userAccount: '',
  checkPassword: ''
});
const onFinish = async (values: any) => {
  try {
    const res = await userRegisterUsingPost({ ...values });
    if (res.data?.code === 0) {
      await router.replace({ path: '/user/login' });
      message.success('注册成功');
    } else {
      message.error(res.data?.message);
    }
  } catch (err) {
    message.warn('注册失败');
  }
};
const handleGoLogin = () => {
  router.push('/user/login');
};
</script>
<style scoped>
.login-root {
  min-height: 100vh;
  display: flex;
  background: #f8fafc;
}
.login-left {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f4f8fb;
  border-right: 1px solid #e6eaf0;
  min-width: 320px;
}
.logo-area {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
.logo-img {
  width: 48px;
  height: 48px;
  margin-right: 12px;
}
.logo-text {
  font-size: 2rem;
  font-weight: 700;
  color: #3a4a5a;
  letter-spacing: 2px;
}
.illustration {
  width: 320px;
  margin-top: 24px;
}
.illustration img {
  width: 100%;
  border-radius: 16px;
  filter: blur(0.5px) brightness(0.98);
}
.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.login-card {
  width: 340px;
  padding: 40px 32px 32px 32px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(60,80,120,0.04);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.login-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #2a3a4a;
  margin-bottom: 32px;
  text-align: center;
}
.input-with-icon {
  border-radius: 24px;
  border: 1px solid #e0e6ed;
  background: #f9fbfd;
  transition: border-color 0.2s;
}
.input-with-icon:focus-within {
  border-color: #7bb1fa;
  background: #fff;
}
.login-btn {
  width: 100%;
  height: 44px;
  border-radius: 24px;
  font-weight: 700;
  font-size: 1.1rem;
  background: #2563eb;
  border: none;
  color: #fff;
  box-shadow: 0 2px 8px 0 rgba(37,99,235,0.08);
  transition: background 0.2s, box-shadow 0.2s;
}
.login-btn:hover {
  background: #174ea6;
  box-shadow: 0 4px 16px 0 rgba(37,99,235,0.12);
}
.register-btn {
  width: 100%;
  height: 44px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 1.05rem;
  background: #fff;
  border: 1.5px solid #2563eb;
  color: #2563eb;
  margin-top: 4px;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
.register-btn:hover {
  background: #f0f6ff;
  color: #174ea6;
  border-color: #174ea6;
}
@media (max-width: 900px) {
  .login-root {
    flex-direction: column;
  }
  .login-left {
    border-right: none;
    border-bottom: 1px solid #e6eaf0;
    min-width: 0;
    padding: 32px 0 0 0;
  }
  .login-right {
    padding: 0 0 32px 0;
  }
  .login-card {
    width: 96vw;
    max-width: 340px;
  }
  .illustration {
    width: 220px;
  }
}
@media (max-width: 600px) {
  .login-root {
    min-height: unset;
  }
  .login-card {
    padding: 24px 8px 16px 8px;
  }
  .logo-area {
    margin-bottom: 16px;
  }
}
</style>
