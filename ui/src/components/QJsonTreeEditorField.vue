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

const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    initUpdated(value, props.modelValue);
    emits('update:modelValue', value);
  },
});

const initUpdated = (newValue, oldValue) => {
  emits('updated', {
    newValue,
    oldValue,
    propKey: props.propKey,
    path: [],
  });
};

const pushUpdated = (data, key) => {
  emits('updated', data);
};

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
    @updated="(data) => pushUpdated(data, propKey)"
  />
</template>

<style scoped></style>
