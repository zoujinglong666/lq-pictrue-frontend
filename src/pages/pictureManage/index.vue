<template>
<div>
  <ProTable
      ref="tableRef"
      :api="listPictureByPageUsingPost"
      :columns="columns"

  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button type="link" danger @click="handleDelete(record)">删除</a-button>
      </template>
      <template v-if="column.key === 'name'">
      <div style="width: 100px;">{{record.name}}</div>
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
import {deletePictureUsingPost, listPictureByPageUsingPost} from "@/api/pictureController.ts";
import {message, Modal} from "ant-design-vue";
import {ref, toRefs} from "vue";
const columns = [
  {
    title: '图片名称',
    dataIndex: 'name',
    key: 'name',
    label: '图片名称',
    type: 'input',
    width: 80,
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
    hideInSearch: true,
  },
  {
    title: '图片高度',
    label: '图片高度',
    dataIndex: 'picHeight',
    key: 'picHeight',
    type: 'input',
    hideInSearch: true,
  },
  {
    title: '图片缩放比例',
    dataIndex: 'picScale',   // 缩写
    key: 'picScale',
    label: '图片缩放比例',
    type: 'input',// 缩写

    hideInSearch: true,

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
    hideInSearch: true,
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
    type: 'select',
  },
  {
    title: '介绍',
    dataIndex: 'introduction',
    key: 'introduction',
    label: '介绍',
    hideInSearch: true,

  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
        label: 'URL',
        type: 'input',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    hideInSearch: true,
  },
];

const tableRef=ref(null)

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
        tableRef.value && tableRef.value.reload && tableRef.value.reload();
      } else {
        message.error(res.message || '删除失败');
      }
    },
  });
};


</script>
