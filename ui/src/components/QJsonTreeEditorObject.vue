<script setup>
import { ref, toRef } from 'vue';
import { vd } from './index';
import QJsonTreeEditorNode from './QJsonTreeEditorNode.vue';

const props = defineProps({
  data: {
    default: () => null,
  },
  schema: {
    type: Object,
    default: () => {},
  },
  // This is useful if no description was sent
  propKey: {
    type: String,
    default: () => 'unknown',
  },
});

const localSchema = toRef(props, 'schema');
const localData = toRef(props, 'data');

const emits = defineEmits(['updated']);
const getPropertyKey = (index) =>
  Object.keys(localSchema.value.properties)[index];

const updateNode = (index, newValue) => {
  vd('updateNode');
  vd(newValue);
  if (newValue) {
  }
  localData.value[getPropertyKey(index)] = newValue;
  emits('updated', localData);
};
</script>

<template>
  <div
    v-for="(property, index) in Object.values(localSchema.properties)"
    :key="'prop_' + index"
  >
    <QJsonTreeEditorNode
      :schema="property"
      :data="localData[getPropertyKey(index)]"
      :propKey="getPropertyKey(index)"
      @updated="(newValue) => updateNode(index, newValue)"
    />
  </div>
</template>
