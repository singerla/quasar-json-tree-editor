<script setup>
import { computed, toRef } from 'vue';
import ButtonAddToArray from '../buttons/ButtonAddToArray.vue';
import QJsonTreeEditorArrayDraggable from './QJsonTreeArrayDraggable.vue';
import QJsonTreeEditorArrayFixed from './QJsonTreeArrayFixed.vue';
import { addItemToArray, computedLocalData } from '../index';

const props = defineProps(['modelValue', 'schema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');
const updated = (data) => {
  emits('updated', data);
};
const addItem = addItemToArray(localData, localSchema);
</script>

<template>
  <QJsonTreeEditorArrayDraggable
    v-if="localSchema.params?.sortable"
    v-model="localData"
    :schema="localSchema"
    :propKey="propKey"
    @updated="updated"
    @add="addItem"
  />
  <QJsonTreeEditorArrayFixed
    v-else
    v-model="localData"
    :schema="localSchema"
    :propKey="propKey"
    @updated="updated"
    @add="addItem"
  />
  <ButtonAddToArray
    v-if="localSchema.params?.showAddButton"
    v-model="localData"
    :schema="localSchema"
    :propKey="propKey"
  />
</template>
