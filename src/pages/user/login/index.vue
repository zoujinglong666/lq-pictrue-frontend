<template>
  <div class="login-container">
    <div class="login-form-card">
      <h3 class="form-title">账号登录</h3>
      <a-form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
      >
        <a-form-item
            label="用户账号"
            name="userAccount"
            :rules="[
            { required: true, message: '请输入账号' },
            { min: 4, message: '账号长度不能少于4位' }
          ]"
        >
          <a-input v-model:value="formState.userAccount" placeholder="请输入账号">
            <template #prefix>
              <UserOutlined/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
            label="用户密码"
            name="userPassword"
            :rules="[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码长度不能少于6位' }
          ]"
        >
          <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码" :visibilityToggle="true">
            <template #prefix>
              <LockOutlined/>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="remember" valuePropName="checked">
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          <a @click="handleForgotPassword" class="login-form-forgot">忘记密码?</a>
        </a-form-item>

        <a-form-item>
          <span>没有账号? </span>
          <a @click="handleGoUserRegister">去注册</a>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button" :loading="loginLoading">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {userLoginUsingPost} from '@/api/userController.ts';
import {useUserStoreWithout} from '@/stores/modules/user.ts';
import {message} from 'ant-design-vue';

const formState = reactive<API.UserLoginRequest & { remember?: boolean }>({
  userPassword: '',
  userAccount: '',
  remember: false
});
const loginLoading = ref(false);
import { useRouter } from 'vue-router';

const router = useRouter();
const onFinish = async (values: any) => {
  loginLoading.value = true;
  try {
    const res = await userLoginUsingPost(values);
    const userStore = useUserStoreWithout();
    userStore.setUserInfo(res.data);
    await router.push({path: '/'});
    message.success('登录成功');
  } catch (err) {
    console.error(err);
    message.error('登录失败，请检查账号密码');
  } finally {
    loginLoading.value = false;
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const handleGoUserRegister = () => {
  router.push({path: '/user/register'});
};

const handleForgotPassword = () => {
  message.info('密码找回功能即将上线');
};
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form-card {
  width: 100%;
  max-width: 750px;
  background: #fff;
  border-radius: 12px;
  padding: 40px 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
}

.login-form-forgot {
  float: right;
  font-size: 13px;
  color: #1890ff;
  cursor: pointer;
}

.login-form-button {
  width: 100%;
  height: 40px;
  font-weight: 600;
}

.login-form :deep(.ant-form-item-label > label) {
  font-weight: 500;
  color: #555;
}
</style>
