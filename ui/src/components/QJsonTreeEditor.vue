<script setup>
import QJsonTreeEditorNode from './QJsonTreeEditorNode.vue';
import { computed, toRef } from 'vue';
import { vd } from './index';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => [],
  },
  schema: {
    type: Object,
    default: () => {},
  },
});

const emits = defineEmits(['update:modelValue']);
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    vd('update editor');
    vd(value);
    emits('update:modelValue', value);
  },
});
</script>

<template>
  <div class="row">
    <div class="col-grow">
      <QJsonTreeEditorNode :schema="schema" v-model="localData" propKey="root">
      </QJsonTreeEditorNode>
    </div>
    <div class="col-shrink">
      <pre>{{ localData }}</pre>
    </div>
  </div>
  <q-separator />
</template>

<style scoped></style>
