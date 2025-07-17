<template>
  <a-table :columns="columns" :data-source="tableData">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <a>删除</a>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { listUserUsingGet } from "@/api/userController.ts";
import { onMounted, reactive, ref } from "vue";

// 列定义（含中文标题）
const columns = [
  {
    title: '用户ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    key: 'userAccount',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    key: 'userAvatar',
  },
  {
    title: '个人简介',
    dataIndex: 'userProfile',
    key: 'userProfile',
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    key: 'userRole',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
];

const tableData = ref([]);
const pageState = reactive({});

const fetchData = async () => {
  const res = await listUserUsingGet({
    pageSize: 10,
    current: 1,
  });
  tableData.value = res.data.records;
};

onMounted(() => {
  fetchData();
});
</script>
