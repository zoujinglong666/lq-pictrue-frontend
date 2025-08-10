<template>

  <div>
    <div class="home-gallery">
      <a-list
          v-if="!loading"
          :grid="{ gutter: 0, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
          :data-source="pictureList"
          class="gallery-list"
      >
        <template #renderItem="{ item }">
          <a-list-item style="padding: 0 8px;">
            <a-card hoverable class="gallery-card" @click="goToDetail(item.id)" style="cursor:pointer;">
              <template #cover>
                <img
                    class="gallery-img"
                    loading="lazy"
                    :alt="item.title || '图片'"
                    :src="item.thumbnailUrl ||item.url || 'https://via.placeholder.com/1280x720.png?text=图片加载失败'"
                    :class="{ 'img-loaded': imageLoaded[item.id] }"
                    @load="handleImageLoad(item.id)"
                />
              </template>
              <a-card-meta
                  :title="item.name || '未命名图片'"
                  :description="item.introduction || '暂无简介'"
              >
                <template #avatar>
                  <a-avatar :src="item.userAvatar || 'https://joeschmoe.io/api/v1/random'" />
                </template>
              </a-card-meta>
              <div class="gallery-meta">
                <span class="gallery-author">{{ item.user.userAccount || '匿名' }}</span>
                <span class="gallery-time">{{ formatDate(item.createTime, 'YYYY-MM-DD') }}</span>
              </div>
            </a-card>
          </a-list-item>
        </template>
      </a-list>
      <div v-else class="gallery-skeleton-list">
        <div v-for="i in 12" :key="i" class="gallery-skeleton-card">
          <div class="gallery-skeleton-img"></div>
          <div class="gallery-skeleton-meta">
            <div class="gallery-skeleton-avatar"></div>
            <div class="gallery-skeleton-lines">
              <div class="gallery-skeleton-line short"></div>
              <div class="gallery-skeleton-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script lang="ts" setup name="PictureList">
import { listPictureVoByPageUsingPost} from "@/api/pictureController.ts";
import {onMounted, ref, watch} from "vue";
import { useRouter } from 'vue-router';

defineOptions({
  name: "PictureList",
})

import { formatDate } from '@/utils/date';
interface PictureItem {
  id: number;
  url?: string;
  title?: string;
  introduction?: string;
  userName?: string;
  userAvatar?: string;
  createTime?: string;
}


const props=defineProps({
  spaceId:Number,
})
const activeTag = ref('');
const selectedCategories = ref<string[]>([]);



const pictureList = ref<PictureItem[]>([]);
const imageLoaded = ref<{ [key: number]: boolean }>({});
const loading = ref(true);

const handleImageLoad = (id: number) => {
  imageLoaded.value[id] = true;
};

const router = useRouter();

const goToDetail = (id: number) => {
  router.push({ path: `/pictureManage/detail`, query: { id } });
};



const fetchData = async () => {
  loading.value = true;
  const res = await listPictureVoByPageUsingPost({
    current: 1,
    pageSize: 20,
    spaceId: props.spaceId,
    // tags: activeTag.value.split(','),
    category: selectedCategories.value.includes('全部') ? undefined : selectedCategories.value.join(',')
  });
  pictureList.value = res.data?.records || [];
  loading.value = false;
};

onMounted(()=>{
  fetchData();
})

</script>
<style scoped>
.home-gallery {
  min-height: 100vh;
}
.gallery-list {
  width: 100%;
  margin: 0 auto;
}

.gallery-card {
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(60,80,120,0.10);
  transition: box-shadow 0.18s, transform 0.18s;
  background: #fff;
  border: none;
}
.gallery-card:hover {
  box-shadow: 0 8px 32px 0 rgba(60,80,120,0.18);
  transform: translateY(-2px) scale(1.025);
}
.gallery-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: #f6f8fa;
  border-bottom: 1px solid #f0f0f0;
  transition: opacity 0.5s, filter 0.18s;
  opacity: 0;
}
.gallery-img.img-loaded {
  opacity: 1;
}
.gallery-card:hover .gallery-img {
  /* 不再模糊图片 */
  filter: none;
}
.gallery-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #888;
  margin-top: 6px;
}
.gallery-author {
  font-weight: 500;
  color: #2563eb;
}
.gallery-time {
  color: #b0b8c8;
}
:deep(.ant-list-items) {
  row-gap: 10px !important;
  column-gap: 10px !important;
}
.gallery-skeleton-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding-top: 8px;
}
.gallery-skeleton-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px 0 rgba(60,80,120,0.10);
  padding: 0;
  overflow: hidden;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  animation: skeleton-fade 1.2s infinite linear alternate;
}
.gallery-skeleton-img {
  width: 100%;
  height: 180px;
  background: linear-gradient(90deg, #f6f8fa 25%, #e6ecf5 50%, #f6f8fa 75%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.2s infinite linear alternate;
}
.gallery-skeleton-meta {
  display: flex;
  align-items: center;
  padding: 12px 8px 8px 8px;
}
.gallery-skeleton-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e6ecf5;
  margin-right: 12px;
}
.gallery-skeleton-lines {
  flex: 1;
}
.gallery-skeleton-line {
  height: 10px;
  background: #e6ecf5;
  border-radius: 4px;
  margin-bottom: 6px;
  width: 100%;
}
.gallery-skeleton-line.short {
  width: 60%;
}
@keyframes skeleton-loading {
  0% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}
@keyframes skeleton-fade {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}
</style>

