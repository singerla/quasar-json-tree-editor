<script setup>
import { computed, toRef } from 'vue';
import QJsonTreeEditorNode from './QJsonTreeEditorNode.vue';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import ButtonAddObjectProperty from '../buttons/ButtonAddObjectProperty.vue';
import { getPropertyKey, hasChildren } from '../index';

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
    v-for="(schema, index) in Object.values(localSchema.properties)"
    :key="'prop_' + index"
  >
    <ButtonAddObjectProperty
      v-if="
        !localData ||
        localData[getPropertyKey(index, localSchema)] === undefined
      "
      v-model="localData"
      :schema="schema"
      :propKey="getPropertyKey(index, localSchema)"
    />

    <QJsonTreeEditorNode
      v-else-if="hasChildren(localSchema).value"
      v-model="localData[getPropertyKey(index, localSchema)]"
      :schema="schema"
      :propKey="getPropertyKey(index, localSchema)"
      @updated="updated"
    />

    <QJsonTreeEditorField
      v-else
      v-model="localData[getPropertyKey(index, localSchema)]"
      :schema="schema"
      :propKey="getPropertyKey(index, localSchema)"
      @updated="updated"
      @drop="localData = undefined"
    />
  </div>
</template>
