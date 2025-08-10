<template>
  <div class="pic-detail-root">
    <div class="pic-detail-main">
      <!-- 图片预览区 -->
      <div class="pic-preview card-container">
        <div class="pic-preview-img-wrap">
          <div v-if="imgLoading" class="pic-img-loading">
            <a-spin size="large" />
          </div>
          <div
              class="pic-img"
          >
            <a-image
                v-show="!imgLoading"
                ref="imgRef"
                :src="picture.url"
                :alt="picture.name"
                @load="onImgLoad"
                @click="handleImgZoom"
                :style="imgStyle"
            />
          </div>

        </div>
        <div class="pic-img-meta">
          <span>{{ picture.picWidth }}×{{ picture.picHeight }}px</span>
        </div>
      </div>
      <!-- 信息展示区 -->
      <div class="pic-info card-container">
        <a-descriptions bordered column="1" size="small">
          <a-descriptions-item label="文件名">
            <span class="info-gray">{{ picture.name }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="格式">
            <span class="info-gray">{{ picture.picFormat }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="大小">
            <span class="info-gray">{{  picture.picSize ? (picture.picSize / 1024 / 1024).toFixed(2) + 'MB' : ''}}</span>
          </a-descriptions-item>
          <a-descriptions-item label="上传时间">
            <span class="info-gray">{{ picture.createTime }}</span>
          </a-descriptions-item>

          <a-descriptions-item label="标签">
            <a-input disabled v-model:value="editInfo.tags" class="info-blue" placeholder="多个标签用逗号分隔" />
          </a-descriptions-item>
        </a-descriptions>

        <div class="pic-ops-group">
          <a-button shape="round" @click="handleDownload(<string>picture.url,picture.name)">下载</a-button>
          <a-popconfirm title="确定要删除这张图片吗？" @confirm="handleDelete(picture)">
            <a-button shape="round" danger>删除</a-button>
          </a-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted,computed } from 'vue';
import {message, Modal} from 'ant-design-vue';
import { useRoute } from 'vue-router';
import {deletePictureUsingPost, getPictureVoByIdUsingGet} from "@/api/pictureController.ts";
const picture = reactive<API.PictureVO>({
  url: '',
  name: '',
  fileName: '',
  format: '',
  size: '',
  createTime: '',
  introduction: '',
  tags: '',
  picFormat: '',
  picSize: 0,
  picWidth: 0,
  picHeight: 0,
  picUrl: '',
  picName: '',

});
const editInfo = reactive({
  name: '',
  introduction: '',
  tags: '',
});
const imgLoading = ref(true);
const imgRef = ref<HTMLImageElement | null>(null);
const imgStyle = ref<any>({});
const zoomVisible = ref(false);

const route = useRoute();

const onImgLoad = (e: Event) => {
  imgLoading.value = false;
};
const handleImgZoom = () => {
  zoomVisible.value = true;
};


const handleDownload = (url: string, filename?: string) => {
  // 创建一个隐藏的 a 标签
  const link = document.createElement('a');
  link.href = url;

  // 如果是跨域且不想打开页面，可尝试设置 download 属性（部分浏览器可能会拦截）
  if (filename) {
    link.download = filename;
  }

  // 触发点击
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleDelete = (record: any) => {
  Modal.confirm({
    title: '确定要删除这张图片吗？',
    content: `图片名称：${record.name}`,
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    async onOk() {
      const res = await deletePictureUsingPost({ id: record.id });
      if (res.code === 0 && res.data) {
        message.success('删除成功');
      } else {
        message.error(res.message || '删除失败');
      }
    },
  });
};



const detailId=computed(()=>route.query.id);
onMounted(async () => {
  // 根据路由参数id拉取图片详情
  if (!detailId.value) {
    message.error('未获取到图片ID');
    return;
  }
  imgLoading.value = true;
  try {
    const res = await getPictureVoByIdUsingGet({ id:detailId.value });
    if (res.code === 0 && res.data) {
      const data = res.data;
      picture.tags = Array.isArray(data.tags) ? data.tags.join(',') : (data.tags || '');
      Object.assign(picture, data);
      editInfo.name = picture.name as string;
      editInfo.introduction = picture.introduction as string;
      editInfo.tags = picture.tags as string;
    } else {
      message.error(res.message || '获取图片详情失败');
    }
  } catch (e) {
    message.error('获取图片详情异常');
  } finally {
    imgLoading.value = false;
  }
});
</script>

<style scoped>
.pic-detail-root {
  min-height: 100vh;
}

.pic-detail-main {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  gap: 8px;
}

.card-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.card-container:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.pic-preview {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 32px;
}

.pic-preview-img-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #f9fafb;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
}

.pic-img-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.pic-img {
  max-width: 360px;

  object-fit: contain;
  display: block;
}

.pic-img:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.pic-img-meta {
  margin-top: 12px;
  color: #888;
  font-size: 15px;
  text-align: center;
}

.pic-info {
  flex: 1;
  padding: 32px;
}

.pic-info :deep(.ant-descriptions-view) {
  min-width: 0;
  max-width: 100%;
  word-break: break-word;
}

.info-gray {
  color: #888;
}

.info-blue {
  color: #2563eb;
}


.pic-ops-group {
  display: flex;
  gap: 18px;
  margin-top: 24px;
}

.pic-img-zoom {
  max-width: 90vw;
  max-height: 80vh;
  display: block;
  margin: 0 auto;
  border-radius: 12px;
  background: #f6f8fa;
}

@media (max-width: 900px) {
  .pic-detail-main {
    flex-direction: column;
    height: auto;
    padding: 16px;
  }
  .pic-info {
    max-width: 100vw;
    min-width: 0;
    padding: 24px;
  }
  .pic-preview {
    padding: 24px;
  }
  .pic-preview-img-wrap {
    height: auto;
    max-height: 40vh;
  }
  .pic-img {
    max-height: 40vh;
  }

}
</style>