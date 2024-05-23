<script setup>
import { toRef } from 'vue';
import { addItemToArray, computedLocalData } from '../index';

const props = defineProps(['modelValue', 'schema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');
const addItem = addItemToArray(localData, localSchema);
</script>

<template>
  <q-btn
    class="q-pa-sm q-ma-sm"
    color="secondary"
    rounded
    dense
    no-caps
    icon="add"
    :label="'#' + (localData.length + 1) + ' to ' + propKey"
    @click="addItem"
  />
</template>
