<script setup>
import { toRef } from 'vue';
import {
  addItemByType,
  clearItemByType,
  computedLocalData,
  isScalar,
} from '../index';
import QJsonTreeField from '../fields/QJsonTreeField.vue';
import QJsonTreeNodeExpansion from './QJsonTreeNodeExpansion.vue';
import QJsonTreeNodeCard from './QJsonTreeNodeCard.vue';
import QJsonTreeNodeDivision from './QJsonTreeNodeDivision.vue';

const props = defineProps(['modelValue', 'schema', 'parentSchema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated', 'drop']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');

const updated = (data) => {
  data.path.push(props.propKey);
  emits('updated', data);
};

const addItem = addItemByType(localData, localSchema);
const clearItem = clearItemByType(localData, localSchema);
</script>

<template>
  <QJsonTreeField
    v-if="isScalar(localSchema).value"
    v-model="localData"
    :schema="localSchema"
    :parentSchema="parentSchema"
    :propKey="propKey"
    @drop="localData = undefined"
    @updated="updated"
  />

  <QJsonTreeNodeExpansion
    v-else-if="localSchema.params?.container === 'Expansion'"
    v-model="localData"
    :propKey="propKey"
    :schema="localSchema"
    :parentSchema="parentSchema"
    @add="addItem"
    @clear="clearItem"
    @drop="emits('drop')"
    @updated="updated"
  />

  <QJsonTreeNodeCard
    v-else-if="localSchema.params?.container === 'Card'"
    v-model="localData"
    :propKey="propKey"
    :schema="localSchema"
    :parentSchema="parentSchema"
    @add="addItem"
    @clear="clearItem"
    @drop="emits('drop')"
    @updated="updated"
  />

  <QJsonTreeNodeDivision
    v-else
    v-model="localData"
    :propKey="propKey"
    :schema="localSchema"
    :parentSchema="parentSchema"
    @add="addItem"
    @clear="clearItem"
    @drop="emits('drop')"
    @updated="updated"
  />
</template>

<style></style>
