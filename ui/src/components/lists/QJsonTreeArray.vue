<script setup>
import ButtonAddToArray from '../buttons/ButtonAddToArray.vue';
import QJsonTreeEditorArrayDraggable from './QJsonTreeArrayDraggable.vue';
import QJsonTreeEditorArrayFixed from './QJsonTreeArrayFixed.vue';
import { addItemToArray, setupDefaults } from '../index';

const props = defineProps(setupDefaults.props);
const emits = defineEmits(setupDefaults.emits);
const { localData, localSchema, parentSchema, propKey, updated } =
  setupDefaults.local(props, emits);

const addItem = addItemToArray(localData, localSchema);
const clear = () => (localData.value = []);
const drop = (index) => localData.value.splice(index, 1);
</script>

<template>
  <QJsonTreeEditorArrayDraggable
    v-if="localSchema.params?.sortable"
    v-model="localData"
    :schema="localSchema"
    :propKey="propKey"
    @updated="updated"
    @add="addItem"
    @clear="clear"
    @drop="drop"
  />
  <QJsonTreeEditorArrayFixed
    v-else
    v-model="localData"
    :schema="localSchema"
    :propKey="propKey"
    @updated="updated"
    @add="addItem"
    @clear="clear"
    @drop="drop"
  />
  <ButtonAddToArray
    v-if="localSchema.params?.showAddButton || localData.length === 0"
    v-model="localData"
    :schema="localSchema"
    :propKey="propKey"
  />
</template>
