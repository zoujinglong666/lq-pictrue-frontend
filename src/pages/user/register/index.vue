<template>
  <div class="login-container">

    <div class="login-logo">
      <img src="https://www.antdv.com/assets/logo.1ef800a8.svg" alt="logo">
      <h2>龙琪图库</h2>
    </div>
    <div class="login-form">

      <a-form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
      >
        <a-form-item
            label="用户账号"
            name="userAccount"
            :rules="[{ required: true, message: '请输入账号' }]"
        >
          <a-input v-model:value="formState.userAccount">
            <template #prefix>
              <UserOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
            label="用户密码"
            name="userPassword"
            :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.userPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
            label="确认密码"
            name="checkPassword"
            :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.checkPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item

        >
          <span>
          已有账号
          </span>
          <span @click="router.push('/user/login')">去登录</span>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button"
                    style="width: 100%">
            注册
          </a-button>
        </a-form-item>
      </a-form>

    </div>

  </div>
</template>
<script lang="ts" setup>
import {reactive} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {userLoginUsingPost, userRegisterUsingPost} from "@/api/userController.ts";
import {useUserStoreWithout} from "@/stores/modules/user.ts";
import router from "@/router";
import {message} from 'ant-design-vue';

const formState = reactive<API.UserRegisterRequest>({
  userPassword: '',
  userAccount: '',
  checkPassword: ''
});
const onFinish = async (values: any) => {
  try {
    const res = await userRegisterUsingPost({
      ...values,
    });

    console.log(res)
    if (res.code === 0) {
      await router.replace({
        path: '/user/login',
      })
      message.success('注册成功');

    } else {
      message.error(res.message);
    }

  } catch (err) {
    console.log(err)
    message.warn('注册失败');
  }

};


</script>
<style scoped>


.login-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.login-logo {
  text-align: center;
  margin-bottom: 20px;
}

</style>
