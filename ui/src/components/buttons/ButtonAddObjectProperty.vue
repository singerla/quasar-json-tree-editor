<script setup>
import { toRef } from 'vue';
import { computedLocalData, createObjectProperty } from '../index';

const props = defineProps(['modelValue', 'schema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');
const localKey = toRef(props, 'propKey');

const createProperty = createObjectProperty(localData, localSchema, localKey);
</script>

<template>
  <q-btn
    class="q-pa-sm q-ma-sm"
    color="primary"
    rounded
    dense
    no-caps
    icon="add"
    :label="propKey"
    @click="createProperty"
  />
</template>
