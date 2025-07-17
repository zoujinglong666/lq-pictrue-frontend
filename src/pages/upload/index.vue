<template>
  <CustomUpload @success="onSuccess" :picture-item="pictureItem" />
</template>

<script setup lang="ts">
import CustomUpload from "@/components/CustomUpload/index.vue";
import {ref} from "vue";
const pictureItem = ref<any>({
  url: "",
});
const onSuccess = (res: any) => {
  pictureItem.value = res.data;
};
</script>
