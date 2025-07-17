<template>
  <ProForm :columns="columns" v-model="formData" @submit="handleSubmit" @reset="handleReset"></ProForm>

  <a-table
      :columns="columns"
      :row-key="rowKeyFn"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
  >
    <template #bodyCell="{ column, text, record }">
      <slot name="bodyCell" :column="column" :text="text" :record="record" />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { TableProps } from 'ant-design-vue';
import ProForm from "@/components/ProForm/index.vue";
const formData = ref({});
async function handleSubmit(formValues) {
  console.log(formValues);
  loading.value = true;
  try {
    const res = await props.api({
      page: current.value,
      size: pageSize.value,
      ...formValues
    });
    const result = res.data;
    dataSource.value = result.records ?? [];
    total.value = result.total ?? 0;
    current.value = result.current ?? 1;

  } catch (e) {
    console.error('Fetch data error:', e);
  } finally {
    loading.value = false;
  }
}

 function handleReset() {
   console.log('Reset:', formData);
  current.value = 1;
   fetchData();
}

interface Props {
  api: (params: Record<string, any>) => Promise<any>;
  columns: any[];
  rowKey?: (record: any) => string;
}

const props = defineProps<Props>();

const loading = ref(false);
const dataSource = ref<any[]>([]);
const current = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 默认 rowKey 函数
const rowKeyFn = props.rowKey ?? ((record: any) => record.id);

// 请求数据函数（根据后端结构）
const fetchData = async () => {
  loading.value = true;
  try {
    const res = await props.api({
      page: current.value,
      size: pageSize.value,

    });

    const data = res.data;

    dataSource.value = data.records ?? [];
    total.value = data.total ?? 0;
    current.value = data.current ?? 1;

  } catch (e) {
    console.error('Fetch data error:', e);
  } finally {
    loading.value = false;
  }
};

// 初始加载
fetchData();

// 分页对象
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
  showSizeChanger: true, // 可选：让用户切换 pageSize
  showQuickJumper: true, // 可选：跳转页码
}));

// 表格分页/排序/筛选变化
const handleTableChange: TableProps['onChange'] = (
    pag,
    filters,
    sorter,
) => {
  current.value = pag.current;
  pageSize.value = pag.pageSize;
  fetchData(); // 重新请求
};
</script>
