<script setup>
import { computed, toRef } from 'vue';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import ButtonAddToArray from '../buttons/ButtonAddToArray.vue';

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

const updated = (data) => {
  emits('updated', data);
};
</script>

<template>
  <div
    v-for="localDataFieldKey of Object.keys(localData)"
    :key="'field_' + propKey + '_' + localDataFieldKey"
    class="q-ma-sm"
  >
    <QJsonTreeEditorField
      :propKey="'field_' + localDataFieldKey"
      v-model="localData[localDataFieldKey]"
      :schema="localSchema.items"
      @updated="updated"
      @drop="localData?.splice(localDataFieldKey, 1)"
    />
    <q-separator />
  </div>
  <ButtonAddToArray
    class="q-pl-md"
    v-model="localData"
    :schema="localSchema"
    :propKey="propKey"
  />
</template>
