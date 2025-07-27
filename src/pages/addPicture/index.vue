<template>
  <div class="pic-detail-root">
    <div class="upload-container">
      <a-card class="upload-card">
        <h2 class="upload-title">上传图片</h2>
        <a-form layout="vertical" :model="form" :rules="formRules" ref="formRef" @submit.prevent="handleSubmit">
          <a-form-item label="图片文件" name="url" class="upload-left-align">
            <CustomUpload @success="onSuccess" :picture-item="pictureItem" class="upload-component" />
          </a-form-item>
          <a-form-item label="图片名称" name="name" required>
            <a-input v-model:value="form.name" placeholder="请输入图片名称" />
          </a-form-item>
          <a-form-item label="简介" name="introduction">
            <a-textarea v-model:value="form.introduction" placeholder="请输入简介" :rows="3" />
          </a-form-item>
          <a-form-item label="分类" name="category" required>
            <a-select v-model:value="form.category" placeholder="请选择分类" :get-popup-container="trigger => trigger.parentNode">
              <a-select-option v-for="cat in categoryList" :key="cat.value" :value="cat.value">{{ cat.label }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="标签" name="tags">
            <a-select v-model:value="form.tags" mode="tags" placeholder="请输入或选择标签">
              <a-select-option v-for="tag in tagsData" :key="tag.value" :value="tag.value">{{ tag.label }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="handleSubmit" :loading="submitLoading" style="width: 100%">提交</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomUpload from "@/components/CustomUpload/index.vue";
import { ref, reactive, onMounted,watch } from "vue";
import { message } from 'ant-design-vue';
import {listPictureTagCategoryUsingGet, editPictureUsingPost} from '@/api/pictureController.ts';
import {useRouter} from "vue-router";

const pictureItem = ref<any>({ url: "" });
const submitLoading = ref(false);
const categoryList = ref<{ label: string; value: string }[]>([]);
const tagsData = ref<{ label: string; value: string }[]>([]);

const form = reactive({
  name: '',
  introduction: '',
  category: '',
  tags: [] as string[],
  url: '',
});

const formRules = {
  name: [
    { required: true, message: '请输入图片名称', trigger: 'blur' },
    { min: 2, max: 32, message: '名称长度2-32字符', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  tags: [
    { type: 'array', required: true, message: '请至少选择1个标签', trigger: 'change' },
    { type: 'array', max: 5, message: '最多选择5个标签', trigger: 'change' }
  ],
};
const formRef = ref();

const onSuccess = (res: any) => {
  console.log(res.data.url)
  pictureItem.value = res.data;
  form.url = res.url;
  form.name = res.data.name;
};

const fetchTagsAndCategories = async () => {
  const res = await listPictureTagCategoryUsingGet();
  if (res.code === 0 && res.data) {
    tagsData.value = (res.data.tagList || []).map((t: string) => ({ label: t, value: t }));
    categoryList.value = (res.data.categoryList || []).map((c: string) => ({ label: c, value: c }));
    // 设置默认值
    if (categoryList.value.length > 0) {
      form.category = categoryList.value[0].value;
    }
    if (tagsData.value.length > 0) {
      form.tags = [tagsData.value[0].value];
    }
  }
};
const router = useRouter();
const handleSubmit = async () => {
  await formRef.value?.validate();
  submitLoading.value = true;
  try {
    const params = {
      id:pictureItem.value.id,
      name: form.name,
      introduction: form.introduction,
      category: form.category,
      tags: form.tags,
      url: form.url,
    };
    const res = await editPictureUsingPost(params);
    if (res.code === 0) {
      message.success('图片上传成功！');
      // 可选：重置表单
      form.name = '';
      form.introduction = '';
      form.category = '';
      form.tags = [];
      form.url = '';
      pictureItem.value = { url: '' };
      formRef.value?.resetFields();
      // await router.push('/pictureManage');

    }
  } catch (e: any) {
    message.error(e.message || '上传失败');
  } finally {
    submitLoading.value = false;
  }
};

onMounted(() => {
  fetchTagsAndCategories();
});


const value = ref<string>('@afc163');
watch(value, () => {
  console.log('value', value);
});
const onSelect = (option: { value: string }) => {
  console.log('select', option);
};

const options = [
  {
    value: 'afc163',
    label: 'afc163',
  },
  {
    value: 'zombieJ',
    label: 'zombieJ',
  },
  {
    value: 'yesmeck',
    label: 'yesmeck',
  },
];
</script>

<style scoped>
.pic-detail-root {
}

.upload-container {
  width: 100%;
}

.upload-card {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 32px;
  background: #fff;
}

.upload-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

/* 上传区域居左对齐 */
.upload-left-align {
  text-align: left !important;
}

.upload-component {
  display: inline-block;
}

/* 表单样式优化 */
:deep(.ant-form-item) {
  margin-bottom: 24px;
}

:deep(.ant-form-item-label > label) {
  font-weight: 500;
  color: #333;
}

:deep(.ant-input), :deep(.ant-select-selector), :deep(.ant-input-textarea) {
  border-radius: 8px;
  border-color: #e0e0e0;
  transition: all 0.2s ease;
}

:deep(.ant-input:focus), :deep(.ant-select-selector:focus-within), :deep(.ant-input-textarea:focus) {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

/* 按钮样式优化 */
:deep(.ant-btn-primary) {
  height: 44px;
  border-radius: 8px;
  font-size: 16px;
  background-color: #2563eb;
  border-color: #2563eb;
}

:deep(.ant-btn-primary:hover) {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .upload-card {
    padding: 24px 16px;
  }

  .upload-title {
    font-size: 1.4rem;
  }
}
</style>