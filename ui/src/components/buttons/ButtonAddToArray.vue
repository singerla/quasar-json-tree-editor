<script setup>
import { computed, toRef } from 'vue';
import { isArray, isNumeric, isObject } from '../index';

const props = defineProps({
  modelValue: {},
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
    emits('update:modelValue', value);
  },
});
const localSchema = toRef(props, 'schema');

const addItem = () => {
  if (isObject(localSchema.value.items).value) {
    const addData = {};
    const addKeys = Object.keys(localSchema.value.items.properties);
    addKeys.forEach((addKey) => {
      const childSchema = localSchema.value.items.properties[addKey];
      if (isObject(childSchema).value) {
        addData[addKey] = {};
      } else if (isArray(childSchema).value) {
        addData[addKey] = [];
      } else {
        addData[addKey] = null;
      }
    });
    localData.value.push(addData);
  } else if (isNumeric(localSchema.value.items).value) {
    localData.value.push(0);
  } else {
    localData.value.push('');
  }
};
</script>

<template>
  <q-btn
    class="q-pa-sm q-ma-sm"
    color="secondary"
    rounded
    dense
    no-caps
    icon="add"
    :label="'#' + localData.length + ' to ' + propKey"
    @click="addItem"
  />
</template>
