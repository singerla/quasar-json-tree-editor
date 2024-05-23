<script setup>
import { computed, toRef } from 'vue';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import ButtonAddToArray from '../buttons/ButtonAddToArray.vue';
import { computedLocalData, isArray } from '../index';
import QJsonTreeEditorArrayDraggable from './QJsonTreeEditorArrayDraggable.vue';

const props = defineProps(['modelValue', 'schema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated', 'add']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');
const updated = (data) => {
  emits('updated', data);
};
const clear = () => (localData.value = []);
</script>

<template>
  <q-item
    dense
    v-for="localDataFieldKey of Object.keys(localData)"
    :key="'field_' + propKey + '_' + localDataFieldKey"
  >
    <q-item-section>
      <QJsonTreeEditorField
        :propKey="'field_' + localDataFieldKey"
        v-model="localData[localDataFieldKey]"
        :schema="localSchema.items"
        :parentSchema="localSchema"
        @updated="updated"
        @drop="localData?.splice(localDataFieldKey, 1)"
        @add="emits('add')"
        @clear="clear"
      />
    </q-item-section>
  </q-item>
</template>
