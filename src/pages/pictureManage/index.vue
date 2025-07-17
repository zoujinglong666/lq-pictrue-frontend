<template>
<div>
  <ProTable
      :api="listPictureByPageUsingPost"
      :columns="columns"

  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <a>删除</a>
        </span>
      </template>

      <template v-if="column.key === 'url'">
        <a-image :src="record.url"  style="width: 100px; height: 100px;object-fit: cover;" />
      </template>
    </template>
  </ProTable>
</div>


</template>

<script lang="ts" setup>
import ProTable from "@/components/ProTable/index.vue";
import {listPictureByPageUsingPost} from "@/api/pictureController.ts";
import {ref} from "vue";
const columns = [
  {
    title: '图片名称',
    dataIndex: 'name',
    key: 'name',
    label: '图片名称',
    type: 'input',
  },
  {
    title: '图片格式',
    dataIndex: 'picFormat',
    key: 'picFormat',
    label: '图片格式',
    type: 'input',
  },
  {
    title: '图片大小',
    dataIndex: 'picSize',
    key: 'picSize',
    label: '图片大小',
    type: 'input',
  },
  {
    title: '图片宽度',
    dataIndex: 'picWidth',
    key: 'picWidth',
    label: '图片宽度',
    type: 'input',
  },
  {
    title: '图片高度',
    label: '图片高度',
    dataIndex: 'picHeight',
    key: 'picHeight',
    type: 'input',
  },
  {
    title: '图片缩放比例',
    dataIndex: 'picScale',   // 缩写
    key: 'picScale',
    label: '图片缩放比例',
    type: 'input',// 缩写

  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    label: '创建时间',
    type: 'input',
  },

  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    label: '更新时间',
    type: 'input',
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId',
    label: '用户ID',
    type: 'input',
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    label: '分类',
    type: 'input',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    label: '标签',
    type: 'input',
  },
  {
    title: '介绍',
    dataIndex: 'introduction',
    key: 'introduction',
    label: '介绍',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
        label: 'URL',
        type: 'input',
  },


  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   key: 'action',
  // },
];
function handleSubmit(value) {
  console.log(value);
}
const formData = ref({
  name: '',
  picFormat: '',
  picSize: '',
  picWidth: '',
  picHeight: '',
  createTime: '',
  updateTime: '',
  userId: '',
  category: '',
  tags: '',
  introduction: '',
  url: '',
})


</script>
