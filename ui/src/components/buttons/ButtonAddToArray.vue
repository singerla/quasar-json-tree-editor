<script setup>
import { addItemToArray, setupDefaults } from '../index';

const props = defineProps(setupDefaults.props);
const emits = defineEmits(setupDefaults.emits);
const { localData, localSchema, parentSchema, propKey, updated } =
  setupDefaults.local(props, emits);

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
