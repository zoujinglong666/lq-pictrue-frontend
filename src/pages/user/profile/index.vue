<template>
  <div class="profile-root">
    <a-card class="profile-card">
      <a-tabs default-active-key="info" >
        <a-tab-pane key="info" tab="基本信息">
          <div class="profile-header">
            <a-upload
                :show-upload-list="false"
                :before-upload="beforeAvatarUpload"
                @change="handleAvatarChange"
            >
              <a-avatar :src="userInfo.userAvatar || defaultAvatar" :size="96" class="profile-avatar" />
              <div class="profile-avatar-edit">更换头像</div>
            </a-upload>
            <div class="profile-info">
              <div class="profile-name">{{ userInfo.userName || '未命名用户' }}</div>
              <div class="profile-account">账号：{{ userInfo.userAccount }}</div>
              <div class="profile-role">角色：{{ userInfo.userRole }}</div>
            </div>
          </div>
          <a-divider />
          <a-form layout="vertical" class="profile-form">
            <a-form-item label="昵称">
              <a-input v-model:value="editInfo.userName" placeholder="请输入昵称" />
            </a-form-item>
            <a-form-item label="个人简介">
              <a-textarea v-model:value="editInfo.userProfile" placeholder="请输入简介" :rows="3" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="handleSaveInfo" :loading="infoLoading">保存信息</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="password" tab="修改密码">
          <a-form layout="vertical" class="profile-form">
            <a-form-item label="原密码">
              <a-input-password v-model:value="passwordForm.oldPassword" placeholder="请输入原密码" />
            </a-form-item>
            <a-form-item label="新密码">
              <a-input-password v-model:value="passwordForm.newPassword" placeholder="请输入新密码" />
            </a-form-item>
            <a-form-item label="确认新密码">
              <a-input-password v-model:value="passwordForm.confirmPassword" placeholder="请再次输入新密码" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="handleChangePassword" :loading="pwdLoading">修改密码</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { useUserStoreWithout } from '@/stores/modules/user';
import {updateUserInfoUsingPost} from "@/api/userController.ts";
const userStore = useUserStoreWithout();
const userInfo = userStore.userInfo;
const defaultAvatar = 'https://joeschmoe.io/api/v1/random';

const editInfo = reactive({
  userName: userInfo.userName,
  userProfile: userInfo.userProfile,
});
const infoLoading = ref(false);

const handleSaveInfo = async () => {
  infoLoading.value = true;
  try {
    // TODO: 调用后端接口保存用户信息
const res = await updateUserInfoUsingPost({
  ...editInfo,
  id: userInfo.id,
});

if(res.code === 0&&res.data){
  userInfo.userName = editInfo.userName;
  userInfo.userProfile = editInfo.userProfile;
  userStore.setUserInfo({ ...userInfo });
  message.success('信息保存成功');
}

  } catch (e) {
    message.error('保存失败');
  } finally {
    infoLoading.value = false;
  }
};

const beforeAvatarUpload = (file: File) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    message.error('只能上传图片文件');
  }
  return isImage;
};
const handleAvatarChange = (info: any) => {
  // TODO: 调用后端接口上传头像，成功后更新userInfo.userAvatar
  message.success('头像上传成功（模拟）');
};

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});
const pwdLoading = ref(false);
const handleChangePassword = async () => {
  if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
    message.warning('请填写完整密码信息');
    return;
  }
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    message.warning('两次输入的新密码不一致');
    return;
  }
  pwdLoading.value = true;
  try {
    // TODO: 调用后端接口修改密码
    message.success('密码修改成功（模拟）');
    passwordForm.oldPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
  } catch (e) {
    message.error('密码修改失败');
  } finally {
    pwdLoading.value = false;
  }
};
</script>

<style scoped>
.profile-root {

}
.profile-card {
  width: 100%;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(60,80,120,0.10);
}
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}
.profile-avatar {
  margin-right: 18px;
  border: 2px solid #e6eaf0;
  box-shadow: 0 2px 8px 0 rgba(60,80,120,0.06);
  cursor: pointer;
  transition: border 0.2s;
}
.profile-avatar-edit {
  color: #2563eb;
  font-size: 0.95rem;
  margin-top: 6px;
  cursor: pointer;
  text-align: center;
}
.profile-info {
  flex: 1;
}
.profile-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2a3a4a;
  margin-bottom: 4px;
}
.profile-account {
  color: #888;
  font-size: 0.98rem;
  margin-bottom: 2px;
}
.profile-role {
  color: #b0b8c8;
  font-size: 0.95rem;
}
.profile-form {
  margin-bottom: 12px;
}
</style> 