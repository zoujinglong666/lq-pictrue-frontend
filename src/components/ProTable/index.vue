<template>
  <div class="pro-table">
    <ProForm :columns="searchColumns" v-model="formData" @submit="handleSubmit" @reset="handleReset"></ProForm>
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
  </div>

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
      current: current.value,
      pageSize: pageSize.value,
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
  current.value = 1;
   fetchData();
}

interface Props {
  api: (params: Record<string, any>) => Promise<any>;
  columns: any[];
  rowKey?: (record: any) => string;
}

const props = defineProps<Props>();

const searchColumns = computed(() => props.columns.filter(col => !col.hideInSearch));

const loading = ref(false);
const dataSource = ref<any[]>([]);
const current = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 默认 rowKey 函数
const rowKeyFn = props.rowKey ?? ((record: any) => record.id);

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await props.api({
      current: current.value,
      pageSize: pageSize.value,
    });

    const data = res.data;

    dataSource.value = data.records ?? [];
    total.value = Number(data.total) ?? 0;
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
  current: Number(current.value),
  pageSize:  Number(pageSize.value),
  showSizeChanger: true, // 可选：让用户切换 pageSize
  showQuickJumper: true, // 可选：跳转页码
}));

// 表格分页/排序/筛选变化
const handleTableChange: TableProps['onChange'] = (
    page,
    filters,
    sorter,
) => {
  current.value = page.current;
  pageSize.value = page.pageSize;
  fetchData(); // 重新请求
};

const reload = () => {
  current.value = 1;
  pageSize.value = 10;
  fetchData(); // 刷新
};
defineExpose({
  reload,
})
</script>

<style  scoped>
.pro-table {
  width: 100%;
  overflow-x: hidden;
}
</style>
