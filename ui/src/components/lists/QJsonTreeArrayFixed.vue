<script setup>
import { toRef } from 'vue';
import QJsonTreeField from '../fields/QJsonTreeField.vue';
import { computedLocalData } from '../index';

const props = defineProps(['modelValue', 'schema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated', 'add', 'clear']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');
const updated = (data) => {
  emits('updated', data);
};
</script>

<template>
  <q-list class="q-json-tree-list">
    <q-item
      dense
      v-for="localDataFieldKey of Object.keys(localData)"
      :key="'field_' + propKey + '_' + localDataFieldKey"
      class="q-json-tree-list-item"
    >
      <q-item-section>
        <QJsonTreeField
          :propKey="'field_' + localDataFieldKey"
          v-model="localData[localDataFieldKey]"
          :schema="localSchema.items"
          :parentSchema="localSchema"
          @updated="updated"
          @drop="localData?.splice(localDataFieldKey, 1)"
          @add="emits('add')"
          @clear="emits('clear')"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
