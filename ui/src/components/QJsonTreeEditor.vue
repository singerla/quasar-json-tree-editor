<script setup>
import QJsonTreeEditorNode from './recursive/QJsonTreeEditorNode.vue';
import { computed, toRef } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => [],
  },
  schema: {
    type: Object,
    default: () => {},
  },
});
const localSchema = toRef(props, 'schema');
const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value);
  },
});

const updated = (data) => {
  emits('updated', data);
};
</script>

<template>
  <QJsonTreeEditorNode
    :schema="localSchema"
    v-model="localData"
    propKey="root"
    @updated="updated"
  >
  </QJsonTreeEditorNode>
</template>

<style scoped></style>
