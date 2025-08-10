<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {listSpaceByPageVoUsingPost} from "@/api/spaceController.ts";
import {useUserStore} from "@/stores/modules/user.ts";
import AddSpace from "@/pages/space/components/AddSpace.vue";
import {useRouter} from "vue-router";
import PictureList from "@/components/PictureList/index.vue";
import EditableSpaceName from "@/pages/space/components/EditableSpaceName.vue";

const userStore = useUserStore()
const hasSpace = ref(false)
const spaceData = ref<API.SpaceVO>({})
const loading = ref(true) // 增加加载状态

const checkHasSpace = async () => {
  try {
    const res = await listSpaceByPageVoUsingPost({
      current: 1,
      pageSize: 10,
      spaceType: 0,
      userId: userStore.userInfo.id
    })

    if (res.code === 0 && res.data.records.length > 0) {
      hasSpace.value = true
      spaceData.value = res.data.records[0]
    } else {
      hasSpace.value = false
    }
  } finally {
    loading.value = false // 数据加载完成
  }
}

onMounted(() => {
  checkHasSpace()
})

const router = useRouter()
const handleSpaceUpload = () => {
  router.push({
    path: '/addPicture',
    query: { spaceId: spaceData.value.id }
  })
}

const formatMB = (bytes: number) => {
  return (bytes / 1024 / 1024).toFixed(2)
}
</script>

<template>
  <!-- 数据加载中 -->
  <div v-if="loading" style="text-align: center; padding: 40px 0;">
    <a-spin size="large" />
  </div>

  <!-- 没有空间 -->
  <AddSpace v-else-if="!hasSpace" />

  <!-- 有空间 -->
  <div v-else>
    <a-card title="我的图片空间" style="margin-bottom: 24px">
      <template #extra>
        <a-button type="primary" @click="handleSpaceUpload">
          上传图片
        </a-button>
      </template>

      <div style="margin-bottom: 12px;">
        <EditableSpaceName
            :spaceData="spaceData"
            @update:spaceName="newName => spaceData.spaceName = newName"
        />
      </div>

      <div style="margin: 8px 0">
        <strong>已用容量：</strong>
        {{ formatMB(spaceData.totalSize) }} / {{ formatMB(spaceData.maxSize) }} MB
        <a-progress
            :show-info="false"
            status="active"
            :percent="(spaceData.totalSize / spaceData.maxSize) * 100"
            :stroke-width="8"
        />
      </div>
      <div>
        <strong>图片数量：</strong>
        {{ spaceData.totalCount }} / {{ spaceData.maxCount }} 张
      </div>
    </a-card>

    <PictureList :space-id="spaceData.id" />
  </div>
</template>
