<template>
<div>
  <ProTable
      ref="tableRef"
      :api="listPictureByPageUsingPost"
      :columns="columns"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
      <div style="width: 100px;">{{record.name}}</div>
      </template>
      <template v-if="column.key === 'url'">
        <a-image :src="record.url"  style="width: 100px; height: 100px;object-fit: cover;" />
      </template>
      <template v-if="column.key === 'reviewStatus'">
     <a-tag  :color="PictureReviewStatusEnum.getColor(record.reviewStatus)">{{PictureReviewStatusEnum.getLabel(record.reviewStatus)}}</a-tag>
      </template>
<!-- 新增操作按钮 -->
      <template v-if="column.key === 'action'" >
        <a-space wrap>
          <a-button type="link"  @click="handleReviewPass(record)" v-if="record.reviewStatus!== PictureReviewStatusEnum.PASS.value">通过</a-button>
          <a-button type="link"  @click="handleReviewRefuse(record)" v-if="record.reviewStatus!== PictureReviewStatusEnum.REJECT.value">拒绝</a-button>
          <a-button type="link" danger @click="handleDelete(record)">删除</a-button>
        </a-space>
      </template>
    </template>
  </ProTable>
</div>
</template>
<script lang="ts" setup>
import ProTable from "@/components/ProTable/index.vue";
import {deletePictureUsingPost, doPictureReviewUsingPost, listPictureByPageUsingPost} from "@/api/pictureController.ts";
import {message, Modal} from "ant-design-vue";
import {ref} from "vue";
import {PictureReviewStatusEnum} from "@/pages/pictureManage/constant";
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
    props: {
      mode:'multiple',
      options: [
        {
          label: '标签1',
          value: '标签1',
        },
        {
          label: '标签2',
          value: '标签2',
        },
      ],
    },

  },
  {
    title: '审核状态',
    dataIndex: 'reviewStatus',
    key: 'reviewStatus',
    label: '审核状态',
    type: 'select',
    props: {
      options: PictureReviewStatusEnum.options
    },

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
    hideInSearch: true,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    hideInSearch: true,
  },
];

const tableRef=ref(null)


const refreshTable = () => {
  tableRef.value && tableRef.value.reload && tableRef.value.reload();
};


function handleReviewPass(record: any) {

  if(!record.id){
    return message.error('请选择图片');
  }
  Modal.confirm({
    title: '确定要通过这张图片吗？', // 提示标题
    content: `图片名称：${record.name}`, // 提示内容
    okText: '通过', // 确认按钮文字
    okType: 'primary', // 确认按钮类型
    cancelText: '取消', // 取消按钮文字
    async onOk() {
      const res = await doPictureReviewUsingPost({ id: record.id, reviewStatus:PictureReviewStatusEnum.PASS.value  });
      if (res.code === 0 && res.data) {
        message.success('通过成功');
        refreshTable();
      } else {
        message.error(res.message || '通过失败');
      }
    },
  });
}

function handleReviewRefuse(record: any) {
  if(!record.id){
    return message.error('请选择图片');
  }
  Modal.confirm({
    title: '确定要拒绝这张图片吗？', // 提示标题
    content: `图片名称：${record.name}`, // 提示内容
    okText: '拒绝', // 确认按钮文字
    okType: 'primary', // 确认按钮类型
    cancelText: '取消', // 取消按钮文字
    async onOk() {
      const res = await doPictureReviewUsingPost({ id: record.id, reviewStatus:PictureReviewStatusEnum.REJECT.value});
      if (res.code === 0 && res.data) {
        message.success('拒绝成功');
        refreshTable();
      } else {
        message.error(res.message || '拒绝失败');
      }
    },
  });
}

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
        refreshTable();
      } else {
        message.error(res.message || '删除失败');
      }
    },
  });
};


</script>
