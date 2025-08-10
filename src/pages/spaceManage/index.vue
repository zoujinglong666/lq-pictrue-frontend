<template>
  <div>
    <ProTable
        ref="tableRef"
        :api="listSpaceByPageUsingPost"
        :columns="columns"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space wrap>
            <a-button type="link" danger @click="handleDelete(record)">删除</a-button>
          </a-space>
        </template>
      </template>
    </ProTable>
  </div>
</template>

<script lang="ts" setup>
import ProTable from "@/components/ProTable/index.vue";
import {listSpaceByPageUsingPost} from "@/api/spaceController";
import {ref} from "vue";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    label: 'ID',
    type: 'input',
    width: 80,
  },
  {
    title: '空间名称',
    dataIndex: 'spaceName',
    key: 'spaceName',
    label: '空间名称',
    type: 'input',
  },
  {
    title: '空间级别',
    dataIndex: 'spaceLevel',
    key: 'spaceLevel',
    label: '空间级别',
    type: 'radio',
    props: {
      options: [
        { label: '普通版', value: 0 },
        { label: '专业版', value: 1 },
        { label: '旗舰版', value: 2 },
      ],
    },
  },

  {
    title: '当前总大小',
    dataIndex: 'totalSize',
    key: 'totalSize',
    label: '当前总大小',
    type: 'input',
    hideInSearch: true,
  },
  {
    title: '当前图片数量',
    dataIndex: 'totalCount',
    key: 'totalCount',
    label: '当前图片数量',
    type: 'input',
    hideInSearch: true,
  },
  {
    title: '创建用户ID',
    dataIndex: 'userId',
    key: 'userId',
    label: '创建用户ID',
    type: 'input',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    label: '创建时间',
    hideInSearch: true,
  },
  {
    title: '编辑时间',
    dataIndex: 'editTime',
    key: 'editTime',
    label: '编辑时间',
    type: 'input',
    hideInSearch: true,
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
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    hideInSearch: true,
  },
];

const tableRef = ref(null);

const refreshTable = () => {
  tableRef.value && tableRef.value.reload && tableRef.value.reload();
};

const handleDelete = (record: any) => {
  // Modal.confirm({
  //   title: '确认删除',
  //   content: `确定要删除空间【${record.spaceName}】吗？`,
  //   onOk: async () => {
  //     try {
  //       await deleteSpaceUsingPost({ id: record.id });
  //       message.success('删除成功');
  //       refreshTable();
  //     } catch (error) {
  //       message.error('删除失败');
  //     }
  //   },
  // });
};
</script>