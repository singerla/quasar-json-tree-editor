<script setup>
import { toRef } from 'vue';
import QJsonTreeEditorNode from './QJsonTreeEditorNode.vue';
import { vd } from './index';
import QJsonTreeEditorObject from './QJsonTreeEditorObject.vue';

const props = defineProps({
  data: {
    default: () => null,
  },
  schema: {
    type: Object,
    default: () => {},
  },
});

// props.data is not writeable, so we emit the new value on update
const emits = defineEmits(['updated']);

const localSchema = toRef(props, 'schema');
const localData = toRef(props, 'data');

const update = (newValue) => {
  emits('updated', newValue);
};

const updateObject = (newVal) => {
  vd(newVal);
  emits('updated');
};
</script>

<template>
  <q-input
    :modelValue="localData"
    @update:modelValue="update"
    v-if="localSchema.type === 'string'"
  />
  <q-input
    :modelValue="localData"
    @update:modelValue="update"
    v-if="localSchema.type === 'number'"
    type="number"
  />
  <q-input
    :modelValue="localData"
    @update:modelValue="update"
    v-if="localSchema.type === 'integer'"
    type="number"
  />
  <div v-if="localSchema.type === 'object'">
    <QJsonTreeEditorObject
      :data="localData"
      :schema="localSchema"
      @updated="updateObject"
    />
  </div>
</template>

<style scoped></style>
