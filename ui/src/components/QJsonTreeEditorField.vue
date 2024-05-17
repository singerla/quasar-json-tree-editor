<script setup>
import { computed, toRef } from 'vue';
import { vd } from './index';
import QJsonTreeEditorObject from './QJsonTreeEditorObject.vue';

const props = defineProps({
  modelValue: {
    default: () => [],
  },
  schema: {
    type: Object,
    default: () => {},
  },
  propKey: {
    type: String,
    default: () => 'unknown',
  },
});

const emits = defineEmits(['update:modelValue', 'updated', 'drop']);
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    initUpdated(value, props.modelValue);
    emits('update:modelValue', value);
  },
});

const initUpdated = (newValue, oldValue) => {
  emits('updated', {
    propKey: props.propKey,
    newValue,
    oldValue,
    path: [],
  });
};

const updated = (data) => {
  emits('updated', data);
};

const drop = () => {
  emits('drop');
};

const localSchema = toRef(props, 'schema');
</script>

<template>
  <q-item>
    <q-item-section>
      <q-input
        dense
        :label="propKey"
        v-model="localData"
        v-if="localSchema.type === 'string'"
      />
      <q-input
        dense
        :label="propKey"
        v-model="localData"
        v-if="localSchema.type === 'number'"
        type="number"
      />
      <q-input
        dense
        :label="propKey"
        v-model="localData"
        v-if="localSchema.type === 'integer'"
        type="number"
      />
      <QJsonTreeEditorObject
        :propKey="propKey"
        v-if="localSchema.type === 'object'"
        v-model="localData"
        :schema="localSchema"
        @updated="updated"
      />
    </q-item-section>
    <q-item-section side>
      <q-btn rounded flat icon="delete" color="danger" @click="drop" />
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
