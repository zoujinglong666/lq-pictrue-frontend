<template>
  <div>
    <strong>空间名称：</strong>
    <span v-if="!editing" @click="startEdit" style="cursor: pointer; user-select:none;">
      {{ spaceData.spaceName || '未命名空间' }}
      <a-icon style="margin-left: 4px; color: #1890ff" type="edit" />
    </span>
    <a-input
        v-else
        v-model:value="editName"
        ref="inputRef"
        size="small"
        style="width: 200px"
        @blur="saveName"
        @keydown.enter.prevent="saveName"
        :disabled="saving"
        placeholder="输入空间名称"
        maxlength="30"
        show-count
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { message } from 'ant-design-vue'
import { updateSpaceUsingPost } from '@/api/spaceController' // 你需要实现的更新接口

const props = defineProps<{
  spaceData: API.SpaceVO
}>()

const emit = defineEmits(['update:spaceName'])

const editing = ref(false)
const editName = ref(props.spaceData.spaceName || '')
const saving = ref(false)
const inputRef = ref()

// 如果空间名变化，更新 editName
watch(() => props.spaceData.spaceName, (val) => {
  if (!editing.value) {
    editName.value = val || ''
  }
})

const startEdit = () => {
  editing.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const saveName = async () => {
  if (saving.value) return
  const newName = editName.value.trim()
  if (!newName) {
    message.error('空间名称不能为空')
    return
  }
  if (newName === props.spaceData.spaceName) {
    editing.value = false
    return
  }
  saving.value = true
  try {
    const res = await updateSpaceUsingPost({
      id: props.spaceData.id,
      spaceName: newName,
    })
    if (res.code === 0) {
      message.success('空间名称更新成功')
      emit('update:spaceName', newName) // 如果父组件绑定了 v-model 便于同步
      editing.value = false
    } else {
      message.error(res.message || '更新失败')
    }
  } catch (err) {
    message.error('更新失败，请稍后重试')
  } finally {
    saving.value = false
  }
}
</script>
