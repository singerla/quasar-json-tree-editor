<script setup>
import { ref, toRef } from 'vue';
import { computedLocalData, isArray, isObject, isScalar } from '../index';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import QJsonTreeEditorObject from './QJsonTreeEditorObject.vue';
import QJsonTreeEditorArray from './QJsonTreeEditorArray.vue';

const props = defineProps(['modelValue', 'schema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');

const updated = (data) => {
  emits('updated', data);
};
</script>

<template>
  <QJsonTreeEditorField
    v-if="isScalar(localSchema).value"
    v-model="localData"
    :propKey="propKey"
    :schema="localSchema"
    @updated="updated"
  />

  <QJsonTreeEditorObject
    v-else-if="isObject(localSchema).value"
    :schema="localSchema"
    :propKey="propKey"
    v-model="localData"
    @updated="updated"
  />

  <QJsonTreeEditorArray
    v-else-if="isArray(localSchema).value"
    :schema="localSchema"
    :propKey="propKey"
    v-model="localData"
    @updated="updated"
  />
</template>

<style scoped></style>
