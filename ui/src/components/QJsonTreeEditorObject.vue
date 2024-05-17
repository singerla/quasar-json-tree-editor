<script setup>
import { computed, ref, toRef } from 'vue';
import { vd } from './index';
import QJsonTreeEditorNode from './QJsonTreeEditorNode.vue';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';

const props = defineProps({
  modelValue: {},
  schema: {
    type: Object,
    default: () => {},
  },
  propKey: {
    type: String,
    default: () => 'unknown',
  },
});

const emits = defineEmits(['update:modelValue']);
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    // updateNode(index, value);
    vd('update object');

    emits('update:modelValue', value);
  },
});

const localSchema = toRef(props, 'schema');

const getPropertyKey = (index) =>
  Object.keys(localSchema.value.properties)[index];
</script>

<template>
  <div
    v-for="(property, index) in Object.values(localSchema.properties)"
    :key="'prop_' + index"
  >
    <QJsonTreeEditorNode
      :schema="property"
      v-model="localData[getPropertyKey(index)]"
      :propKey="getPropertyKey(index)"
    />
  </div>
  <q-separator />
</template>
