<script setup>
import { computed, toRef } from 'vue';
import { vd } from './index';
import QJsonTreeEditorObject from './QJsonTreeEditorObject.vue';

const props = defineProps({
  modelValue: {
    default: () => [],
  },
  schema: {
    type: Object,
    default: () => {},
  },
  propKey: {
    type: String,
    default: () => 'unknown',
  },
});

const emits = defineEmits(['update:modelValue']);
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    vd('update field');
    emits('update:modelValue', value);
  },
});

const localSchema = toRef(props, 'schema');
</script>

<template>
  <q-input
    :label="propKey"
    v-model="localData"
    v-if="localSchema.type === 'string'"
  />
  <q-input
    :label="propKey"
    v-model="localData"
    v-if="localSchema.type === 'number'"
    type="number"
  />
  <q-input
    :label="propKey"
    v-model="localData"
    v-if="localSchema.type === 'integer'"
    type="number"
  />
  <QJsonTreeEditorObject
    :propKey="propKey"
    v-if="localSchema.type === 'object'"
    v-model="localData"
    :schema="localSchema"
  />
</template>

<style scoped></style>
