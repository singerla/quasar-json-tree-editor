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

const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value);
  },
});

const updated = (data) => {
  emits('updated', data);
};

const localSchema = toRef(props, 'schema');

const getPropertyKey = (index) =>
  Object.keys(localSchema.value.properties)[index];

const addProp = (index, property) => {
  if (property.type === 'object') {
    localData.value[getPropertyKey(index)] = {};
  } else if (property.type === 'array') {
    localData.value[getPropertyKey(index)] = [];
  } else if (property.type === 'integer') {
    localData.value[getPropertyKey(index)] = 0;
  } else {
    localData.value[getPropertyKey(index)] = 'new';
  }
};
</script>

<template>
  <div
    v-for="(property, index) in Object.values(localSchema.properties)"
    :key="'prop_' + index"
  >
    <div v-if="!localData[getPropertyKey(index)]">
      <q-btn
        :label="'add a ' + getPropertyKey(index)"
        @click="addProp(index, property)"
      />
    </div>
    <QJsonTreeEditorNode
      v-else
      :schema="property"
      v-model="localData[getPropertyKey(index)]"
      :propKey="getPropertyKey(index)"
      @updated="updated"
    />
  </div>
  <q-separator />
</template>
