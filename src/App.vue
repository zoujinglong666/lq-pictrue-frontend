<script setup lang="ts">
import BasicLayout from "./components/Layouts/BasicLayout.vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
</script>

<template>
  <a-config-provider :locale="zhCN">
    <BasicLayout></BasicLayout>
  </a-config-provider>
</template>


