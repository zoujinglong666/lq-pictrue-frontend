<script setup lang="ts">
import { onMounted,ref } from 'vue'
import {listSpaceByPageVoUsingPost} from "@/api/spaceController.ts";
import {useUserStore} from "@/stores/modules/user.ts";
import AddSpace from "@/pages/user/space/components/AddSpace.vue";
onMounted(() => {
  checkHasSpace()
})
const userStore = useUserStore()
const hasSpace = ref(false)
const spaceData = ref<API.SpaceVO>({

})
const checkHasSpace = async () => {
  const res = await listSpaceByPageVoUsingPost({
    current: 1,
    pageSize: 10,
    spaceType:0,
    userId:userStore.userInfo.id
  })

  if(res.code === 0 && res.data.records.length > 0){
    hasSpace.value = true
    spaceData.value = res.data.records[0]
  }else {
    hasSpace.value = false
  }
}

</script>

<template>


  <AddSpace v-if="!hasSpace" />
  <div v-if="hasSpace">
    <!-- 空间信息卡片 -->
    <a-card title="我的图片空间" style="margin-bottom: 24px">
      <div><strong>空间名称：</strong>{{ spaceData.spaceName }}</div>
      <div><strong>已用容量：</strong>{{ spaceData.totalSize }} / {{ spaceData.maxSize }} 字节</div>
      <div><strong>图片数量：</strong>{{ spaceData.totalCount }} / {{ spaceData.maxCount }} 张</div>
    </a-card>
  </div>

</template>

<style scoped>

</style>