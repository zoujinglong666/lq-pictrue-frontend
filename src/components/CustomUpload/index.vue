<template>
  <a-upload
      v-model:fileList="fileList"
      :customRequest="handleCustomUpload"
      :beforeUpload="beforeUpload"
      :multiple="multiple"
      :accept="accept"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :maxCount="maxCount"
      @change="onChange"
  >

    <img v-if="pictureItem.url" :src="pictureItem.url" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {message, Upload} from 'ant-design-vue';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import {uploadPictureUsingPost} from "@/api/pictureController.ts";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

// ------------------ props ------------------
interface Props {

  maxSizeMb?: number;
  accept?: string;
  multiple?: boolean;
  maxCount?: number;
  hint?: string;
  spaceId?: string;
  pictureItem?: object;
}
const props = withDefaults(defineProps<Props>(), {
  maxSizeMb: 2,
  accept: '',
  multiple: false,
  maxCount: 1,
  spaceId:'',
  hint: '支持单文件或批量上传，单文件最大2Mb',
});

// ------------------ emit ------------------
const emit = defineEmits<{
  (e: 'success', res: any): void;
  (e: 'error', err: any): void;
}>();

const fileList = ref<UploadProps['fileList']>([]);

// ------------------ 验证文件大小 ------------------
const beforeUpload = (file: File) => {
  const isLtMax = file.size / 1024 / 1024 < props.maxSizeMb;
  if (!isLtMax) {
    message.error(`文件必须小于 ${props.maxSizeMb}MB!`);
  }
  return isLtMax || Upload.LIST_IGNORE;
};
const loading = ref(false);
// ------------------ 自定义上传逻辑 ------------------
const handleCustomUpload: UploadProps['customRequest'] = async (options) => {
  const { file, onSuccess, onError } = options;
  loading.value = true;
  try {
    const res = await uploadPictureUsingPost({

    },{
      spaceId: props.spaceId||undefined
    },file);
    if(res.code===0){
      message.success(`${file.name} 上传成功`);
      fileList.value.push({
        name: file.name,
        url: res.data.url,
        uid: res.data.id,
        status: 'done',
      });
      onSuccess?.(res, file);
      emit('success', res);
    }else {
      fileList.value=[]
      message.error(`${file.name} 上传失败`);
    }

  } catch (err) {
    onError?.(err);
    emit('error', err);
  }finally {
    loading.value = false;
  }
};

// ------------------ 拖拽事件 ------------------
const onDrop = (e: DragEvent) => {
  console.log('Dropped files', e.dataTransfer?.files);
};

const onChange = (info: UploadChangeParam) => {
  console.log('Upload change:', info.fileList);
};
</script>
<style scoped>
.avatar-uploader-wrapper {
  width: 100%;
}

.avatar-uploader ::v-deep(.ant-upload.ant-upload-select-picture-card) {
  width: 100% !important;
  height: 180px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-uploader ::v-deep(.ant-upload-select-picture-card i) {
  font-size: 32px;
  color: #999;
}

.avatar-uploader ::v-deep(.ant-upload-text) {
  margin-top: 8px;
  color: #666;
}

.avatar-uploader img {
  max-width: 100%;
  max-height: 180px;
  width: auto;
  height: auto;
  display: block;
  margin: 0 auto;
  object-fit: cover;
  border-radius: 8px;
  background: #f6f8fa;
  box-shadow: 0 2px 8px rgba(60,80,120,0.04);
}
</style>
