<script setup>
import { toRef } from 'vue';
import QJsonTreeNode from '../containers/QJsonTreeNode.vue';
import QJsonTreeField from '../fields/QJsonTreeField.vue';
import ButtonAddObjectProperty from '../buttons/ButtonAddObjectProperty.vue';
import {
  clearItemByType,
  computedLocalData,
  getPropertyKey,
  hasChildren,
  vd,
} from '../index';

const props = defineProps(['modelValue', 'schema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');

const updated = (data) => {
  emits('updated', data);
};
const clear = clearItemByType(localData, localSchema);
const drop = () => {
  vd('drop ');
};
</script>

<template>
  <q-item
    v-for="(schema, index) in Object.values(localSchema.properties)"
    :key="'prop_' + index"
  >
    <div
      v-if="
        !localData ||
        localData[getPropertyKey(index, localSchema)] === undefined
      "
    >
      <ButtonAddObjectProperty
        v-model="localData"
        :schema="schema"
        :propKey="getPropertyKey(index, localSchema)"
      />
    </div>

    <q-item-section v-else>
      <QJsonTreeNode
        v-if="hasChildren(localSchema).value"
        v-model="localData[getPropertyKey(index, localSchema)]"
        :schema="schema"
        :parentSchema="localSchema"
        :propKey="getPropertyKey(index, localSchema)"
        @updated="updated"
        @drop="localData[getPropertyKey(index, localSchema)] = undefined"
      />

      <QJsonTreeField
        v-else
        v-model="localData[getPropertyKey(index, localSchema)]"
        :schema="schema"
        :parentSchema="localSchema"
        :propKey="getPropertyKey(index, localSchema)"
        @updated="updated"
        @drop="drop"
      />
    </q-item-section>
  </q-item>
</template>
