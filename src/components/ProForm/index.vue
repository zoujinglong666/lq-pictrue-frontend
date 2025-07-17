<script setup lang="ts">
import {ref, computed, useTemplateRef} from "vue";
import {type FormInstance,  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  Switch,
  Checkbox,
  Radio,
  Slider,
  Rate,
  TreeSelect,
  Cascader,
  Mentions,
  AutoComplete,
  Upload,} from "ant-design-vue";

export interface FormColumn {
  key: string;
  label: string;
  type: 'input' | 'select'; // 可扩展其他类型
  props?: Record<string, any>;
  rules?: any[];
}

export interface ProFormProps {
  columns: FormColumn[];
}
const props = withDefaults(defineProps<ProFormProps>(), {
  columns: () => [],
});
const emit = defineEmits(["submit"]);
function submit() {
  emit("submit",modelValue.value);
}

const modelValue = defineModel({});
const componentMap = {
  input: Input,
  inputNumber: InputNumber,
  select: Select,
  datePicker: DatePicker,
  rangePicker: DatePicker.RangePicker, // 注意：rangePicker 是子组件
  timePicker: TimePicker,
  switch: Switch,
  checkbox: Checkbox,
  radio: Radio.Group,       // 多选单选，推荐用 Radio.Group
  slider: Slider,
  rate: Rate,
  treeSelect: TreeSelect,
  cascader: Cascader,
  mentions: Mentions,
  autoComplete: AutoComplete,
  upload: Upload,
};


// 折叠/展开控制
const showAll = ref(false);
const defaultVisibleCount = 4;

const visibleColumns = computed(() => {
  return showAll.value ? props.columns : props.columns.slice(0, defaultVisibleCount);
});
const labelCol = { style: { width: '100px' } };

const formInstance = useTemplateRef<FormInstance>("formRef");
const resetFields = () => {
  emit("reset");
  formInstance.value?.resetFields();
}

defineExpose({
  validate(){
    return formInstance.value?.validate();
},
  resetFields(){
    return formInstance.value?.resetFields();
  },
  submit,
  formInstance,
});

</script>

<template>
  <a-form :model="modelValue" :rules="{}" ref="formRef">
    <a-row :gutter="[8, 8]">
      <!-- 表单项 -->
      <a-col
          v-for="(item, index) in visibleColumns"
          :key="item.key || index"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
      >
        <a-form-item :key="item.key" :label-col="labelCol" auto-link :label="item.label" :name="item.key" :rules="item.rules" :label-align="'center'">
          <component
              :is="componentMap[item.type]"
              v-model:value="modelValue[item.key]"
              v-bind="item.props"
          />
        </a-form-item>
      </a-col>

      <!-- 按钮作为一个“表单项” -->
      <a-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          style="display: flex; align-items: center;"
      >
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="submit">搜索</a-button>
            <a-button  @click="resetFields">重置</a-button>
            <a-button
                v-if="props.columns.length > defaultVisibleCount"
                type="link"
                @click="showAll = !showAll"
            >
              {{ showAll ? "收起" : "展开" }}
            </a-button>
          </a-space>

        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>




