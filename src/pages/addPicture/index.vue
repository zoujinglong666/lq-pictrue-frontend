<template>
  <div class="pic-detail-root">
    <div class="upload-container">
      <a-card class="upload-card">
        <a-segmented
            v-model:value="uploadType"
            :options="[
    { label: '文件上传', value: 'file'},
    { label: 'URL上传', value: 'url' }
  ]"
            block
        />
        <a-form ref="formRef" :model="form" layout="vertical" @submit.prevent="handleSubmit">
          <a-form-item class="upload-left-align" label="图片文件"  v-if="uploadType==='file'">
            <CustomUpload :spaceId="spaceId" :picture-item="pictureItem" class="upload-component" @success="onSuccess"/>
          </a-form-item>
          <a-form-item class="upload-left-align" label="URL上传"  v-if="uploadType==='url'">
            <a-input-search
                v-model:value="picUrl"
                placeholder="请输入文件url地址"
                size="large"
            >
              <template #enterButton>
                <a-button @click="handleSubmitPicUrl">上传图片</a-button>
              </template>
            </a-input-search>
          </a-form-item>
          <div v-if="pictureItem.url">

            <a-image  v-if="uploadType==='url'" :src="pictureItem.url"
                      :width="200"
            />
            <a-form-item label="图片名称" name="name" required>
              <a-input v-model:value="form.name"
                       placeholder="请输入图片名称"/>

            </a-form-item>
            <a-form-item label="简介" name="introduction">
              <a-textarea v-model:value="form.introduction" :rows="3" placeholder="请输入简介"/>
            </a-form-item>
            <a-form-item label="分类" name="category" required>
              <a-select v-model:value="form.category"
                        placeholder="请选择分类">
                <a-select-option v-for="cat in categoryList" :key="cat.value" :value="cat.value">{{
                    cat.label
                  }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="标签" name="tags">
              <a-select v-model:value="form.tags" mode="tags" placeholder="请输入或选择标签" >
                <a-select-option v-for="tag in tagsData" :key="tag.value" :value="tag.value">{{
                    tag.label
                  }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
          <a-form-item>
            <a-button :loading="submitLoading" style="width: 100%" type="primary" @click="handleSubmit">提交</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CustomUpload from "@/components/CustomUpload/index.vue";
import {computed, onMounted, reactive, ref, h} from "vue";
import {message} from 'ant-design-vue';
import {
  editPictureUsingPost,
  listPictureTagCategoryUsingGet,
  uploadPictureByUrlUsingPost
} from '@/api/pictureController.ts';
import {useRoute, useRouter} from "vue-router";
const uploadType = ref('file');
const pictureItem = ref<any>({url: "",
});
const submitLoading = ref(false);
const categoryList = ref<{ label: string; value: string }[]>([]);
const tagsData = ref<{ label: string; value: string }[]>([]);
const picUrl = ref<string>('')
const form = reactive({
  name: '',
  introduction: '',
  category: '',
  tags: [] as string[],
  url: '',
});
const router = useRouter();
const route = useRoute();


const spaceId = computed(() => {
  return route.query.spaceId ? String(route.query.spaceId) : ''
});


// 移除表单验证规则，使用简单验证
const formRef = ref();

const onSuccess = (res: any) => {
  pictureItem.value = res.data;
  form.name = res.data.name;
};

const fetchTagsAndCategories = async () => {
  try {
    const res: any = await listPictureTagCategoryUsingGet();
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
  } catch (error) {
    console.error('获取标签和分类失败:', error);
  }
};
const handleSubmit = async () => {
  // 简单验证
  if (!form.name) {
    message.error('请输入图片名称');
    return;
  }
  if (!form.category) {
    message.error('请选择分类');
    return;
  }
  submitLoading.value = true;

    try {
      const params = {
        id: pictureItem.value.id,
        name: form.name,
        introduction: form.introduction,
        category: form.category,
        tags: form.tags,
      };
      const res: any = await editPictureUsingPost(params);
      if (res.code === 0) {
        message.success('图片上传成功！');
        // 可选：重置表单
        form.name = '';
        form.introduction = '';
        form.category = '';
        form.tags = [];
        form.url = '';
        pictureItem.value = {url: '',id:undefined};
        formRef.value?.resetFields();
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

const handleSubmitPicUrl=async () => {
  const res = await uploadPictureByUrlUsingPost({
    fileUrl:picUrl.value,
    spaceId:spaceId.value as number,
  })
  if(res.code === 0) {
    pictureItem.value = res.data;
    form.name = res.data.name;
    message.success("上传成功")
    picUrl.value = '';
  }

}


</script>

<style scoped>


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