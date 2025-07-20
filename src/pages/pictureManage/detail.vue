<template>
  <div class="pic-detail-root">
    <div class="pic-detail-main">
      <!-- 图片预览区 -->
      <div class="pic-preview card-container">
        <div class="pic-preview-img-wrap">
          <div v-if="imgLoading" class="pic-img-loading">
            <a-spin size="large" />
          </div>
          <img
              v-show="!imgLoading"
              ref="imgRef"
              :src="picture.url"
              :alt="picture.name"
              class="pic-img"
              @load="onImgLoad"
              @click="handleImgZoom"
              @wheel="handleImgWheel"
              :style="imgStyle"
          />
        </div>
        <div class="pic-img-meta">
          <span>{{ imgNaturalWidth }}×{{ imgNaturalHeight }}px</span>
        </div>
      </div>
      <!-- 信息展示区 -->
      <div class="pic-info card-container">
        <a-descriptions bordered column="1" size="small">
          <a-descriptions-item label="文件名">
            <span class="info-gray">{{ picture.fileName }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="格式">
            <span class="info-gray">{{ picture.format }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="大小">
            <span class="info-gray">{{ picture.size }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="上传时间">
            <span class="info-gray">{{ picture.createTime }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="图片名称">
            <a-input v-model:value="editInfo.name" class="info-blue" />
          </a-descriptions-item>
          <a-descriptions-item label="描述">
            <a-input v-model:value="editInfo.introduction" class="info-blue" />
          </a-descriptions-item>
          <a-descriptions-item label="标签">
            <a-input v-model:value="editInfo.tags" class="info-blue" placeholder="多个标签用逗号分隔" />
          </a-descriptions-item>
        </a-descriptions>

        <div class="pic-ops-group">
          <a-button shape="round" @click="handleDownload">下载</a-button>
          <a-popconfirm title="确定要删除这张图片吗？" @confirm="handleDelete">
            <a-button shape="round" danger>删除</a-button>
          </a-popconfirm>
          <a-button type="primary" shape="round" @click="handleSave">保存修改</a-button>
        </div>
      </div>
    </div>
    <!-- 操作区 -->
    <div class="pic-ops">

    </div>
    <!-- 放大预览弹窗 -->
    <a-modal v-model:open="zoomVisible" width="auto" :footer="null" :centered="true">
      <img :src="picture.url" :alt="picture.name" class="pic-img-zoom" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted,computed } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import {getPictureVoByIdUsingGet} from "@/api/pictureController.ts";
const picture = reactive({
  url: '',
  name: '',
  fileName: '',
  format: '',
  size: '',
  createTime: '',
  introduction: '',
  tags: '',
});
const editInfo = reactive({
  name: '',
  introduction: '',
  tags: '',
});
const imgLoading = ref(true);
const imgRef = ref<HTMLImageElement | null>(null);
const imgNaturalWidth = ref(0);
const imgNaturalHeight = ref(0);
const imgStyle = ref<any>({});
const zoomVisible = ref(false);

const route = useRoute();

const onImgLoad = (e: Event) => {
  imgLoading.value = false;
  const img = e.target as HTMLImageElement;
  imgNaturalWidth.value = img.naturalWidth;
  imgNaturalHeight.value = img.naturalHeight;
};
const handleImgZoom = () => {
  zoomVisible.value = true;
};
const handleImgWheel = (e: WheelEvent) => {
  // 简单缩放
  // e.preventDefault();
  // let scale = imgStyle.value.transform ? Number(imgStyle.value.transform.replace(/[^\d.]/g, '')) : 1;
  // scale += e.deltaY < 0 ? 0.1 : -0.1;
  // scale = Math.max(0.2, Math.min(3, scale));
  // imgStyle.value = { transform: `scale(${scale})` };
};

const handleDownload = () => {
  message.success('下载成功（模拟）');
};
const handleDelete = () => {
  message.success('已删除（模拟）');
};
const handleSave = () => {
  message.success('已保存（模拟）');
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
      picture.url = data.url || '';
      picture.name = data.name || '';
      picture.fileName = data.fileName || '';
      picture.format = data.picFormat || '';
      picture.size = data.picSize ? (data.picSize / 1024 / 1024).toFixed(2) + 'MB' : '';
      picture.createTime = data.createTime || '';
      picture.introduction = data.introduction || '';
      picture.tags = Array.isArray(data.tags) ? data.tags.join(',') : (data.tags || '');
      editInfo.name = picture.name;
      editInfo.introduction = picture.introduction;
      editInfo.tags = picture.tags;
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
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: zoom-in;
  transition: all 0.2s ease;
  background: #f6f8fa;
  margin: 0 auto;
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