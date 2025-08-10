<template>


      <a-card title="创建图片空间" :bordered="false" >
        <div style="max-width: 900px; margin: 0 auto; padding: 24px;">
          <a-form
              ref="formRef"
              :model="formState"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
          >
            <!-- 空间名称 -->
            <a-form-item label="空间名称" name="spaceName">
              <a-input
                  v-model:value="formState.spaceName"
                  placeholder="不填则为默认空间"
                  allow-clear
              />
            </a-form-item>

            <!-- 空间级别 -->
            <a-form-item label="空间级别" name="spaceLevel">
              <div class="space-card-container">
                <div
                    v-for="item in spaceLevels"
                    :key="item.value"
                    :class="['space-card', formState.spaceLevel === item.value ? 'active' : '']"
                    @click="formState.spaceLevel = item.value"
                >
                  <h3>{{ item.label }}</h3>
                  <p class="desc">{{ item.desc }}</p>
                  <p class="capacity">{{ item.capacity }}</p>
                </div>
              </div>
            </a-form-item>

            <!-- 提交按钮 -->
            <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
              <a-button type="primary" @click="onSubmit" :loading="loading">
                创建空间
              </a-button>
              <a-button style="margin-left: 10px" @click="resetForm">
                重置
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-card>

</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { message } from 'ant-design-vue';
import { createSpaceUsingPost } from '@/api/spaceController';
import { useRouter } from 'vue-router';

interface FormState {
  spaceName: string;
  spaceLevel: number;
}

const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const loading = ref(false);
const router = useRouter();

const spaceLevels = [
  { value: 0, label: '普通版', desc: '适合个人用户，基础功能', capacity: '容量：100MB' },
  { value: 1, label: '专业版', desc: '适合中小团队，增强功能', capacity: '容量：50GB' },
  { value: 2, label: '旗舰版', desc: '适合大型企业，全部功能开放', capacity: '容量：500GB+' }
];

const formState = reactive<FormState>({
  spaceName: '',
  spaceLevel: 0
});

const rules: Record<string, Rule[]> = {
  spaceName: [
    { max: 30, message: '空间名称不能超过30个字符', trigger: 'blur' }
  ],
  spaceLevel: [
    { required: true, message: '请选择空间级别', type: 'number', trigger: 'change' }
  ]
};

const onSubmit = async () => {
  try {
    await formRef.value.validate();
    loading.value = true;
    const res = await createSpaceUsingPost(toRaw(formState));
    if (res.code === 0) {
      message.success('空间创建成功');
      router.push('/my/space');
    } else {
      message.error(res.message || '创建失败');
    }
  } catch (err) {
    console.error('提交失败', err);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<style scoped>
.space-card-container {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  gap: 20px;
  width: 100%;
}
.space-card {
  flex: 1;
  min-width: 180px;
  max-width: 220px;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #f0f0f0;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.space-card:hover {
  border-color: #1890ff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.space-card.active {
  border-color: #1890ff;
  background-color: #e6f7ff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.space-card h3 {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
}
.space-card .desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}
.space-card .capacity {
  font-size: 13px;
  color: #999;
}
</style>
