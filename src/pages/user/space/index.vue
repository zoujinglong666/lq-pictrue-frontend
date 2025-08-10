<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {listSpaceByPageVoUsingPost} from "@/api/spaceController.ts";
import {useUserStore} from "@/stores/modules/user.ts";
import AddSpace from "@/pages/user/space/components/AddSpace.vue";
import {useRouter} from "vue-router";
import PictureList from "@/components/PictureList/index.vue";

onMounted(() => {
  checkHasSpace()
})
const userStore = useUserStore()
const hasSpace = ref(false)
const spaceData = ref<API.SpaceVO>({})
const checkHasSpace = async () => {
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
}
const router = useRouter()
const handleSpaceUpload = () => {
  router.push({
    path: '/addPicture',
    query: {
      spaceId: spaceData.value.id
    }
  })

}
const formatMB = (bytes: number) => {
  return (bytes / 1024 / 1024).toFixed(2)
}
</script>

<template>


  <AddSpace v-if="!hasSpace"/>
  <div v-if="hasSpace">
    <!-- 空间信息卡片 -->
    <a-card title="我的图片空间" style="margin-bottom: 24px">
      <template #extra>
        <a-button type="primary" @click="handleSpaceUpload">
          上传图片
        </a-button>
      </template>

      <div>
        <strong>空间名称：</strong>{{ spaceData.spaceName }}
      </div>

      <div style="margin: 8px 0">
        <strong>已用容量：</strong>
        {{ formatMB(spaceData.totalSize) }} / {{ formatMB(spaceData.maxSize) }} MB
        <a-progress
            :percent="(spaceData.totalSize / spaceData.maxSize).toFixed(2) * 100"
            :stroke-width="8"
        />
      </div>

      <div>
        <strong>图片数量：</strong>
        {{ spaceData.totalCount }} / {{ spaceData.maxCount }} 张
      </div>
    </a-card>
      <PictureList :space-id="spaceData.id"></PictureList>

  </div>

</template>

<style scoped>


</style>


