<script setup lang="ts">
import BasicLayout from "./components/Layouts/BasicLayout.vue";
import { useGlobalStore } from "@/stores/modules/global";
import { Spin } from "ant-design-vue";
const globalStore = useGlobalStore();
</script>

<template>
  <BasicLayout />
  <a-spin
    v-if="globalStore.enabled"
    :spinning="globalStore.loading"
    :tip="globalStore.loadingText"
    size="large"
    :style="globalStore.centered
      ? 'position: fixed; z-index: 9999; left: 0; top: 0; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.4); pointer-events: none;'
      : 'position: fixed; z-index: 9999; left: 0; top: 0; width: 100vw; height: 100vh; background: rgba(255,255,255,0.4); pointer-events: none;'
    "
  />
</template>


