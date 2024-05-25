<script setup>
import { toRef } from 'vue';
import { computedLocalData } from '../index';
import QJsonTreeElement from './QJsonTreeElement.vue';

const props = defineProps(['modelValue', 'schema', 'parentSchema', 'propKey']);
const emits = defineEmits([
  'update:modelValue',
  'updated',
  'add',
  'drop',
  'clear',
]);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');
const updated = (data) => {
  emits('updated', data);
};
</script>

<template>
  <div class="q-json-tree-node-division">
    <QJsonTreeElement
      v-model="localData"
      :propKey="propKey"
      :schema="localSchema"
      @updated="updated"
    />
  </div>
</template>

<style scoped></style>
