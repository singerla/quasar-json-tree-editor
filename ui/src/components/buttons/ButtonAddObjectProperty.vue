<script setup>
import { computed, toRef } from 'vue';
import { isArray, isNumeric, isObject } from '../index';

const props = defineProps({
  modelValue: { default: () => {} },
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
const localKey = toRef(props, 'propKey');

const createProperty = () => {
  if (isNumeric(localSchema.value).value) {
    localData.value[localKey.value] = 0;
  } else if (isObject(localSchema.value).value) {
    localData.value[localKey.value] = {};
  } else if (isArray(localSchema.value).value) {
    localData.value[localKey.value] = [];
  } else {
    localData.value[localKey.value] = '';
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
    :label="propKey"
    @click="createProperty"
  />
</template>
