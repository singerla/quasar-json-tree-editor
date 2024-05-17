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
const localSchema = toRef(props, 'schema');
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
</script>

<template>
  <div class="row">
    <div class="col-grow">
      <QJsonTreeEditorNode
        :schema="schema"
        v-model="localData"
        propKey="root"
        @updated="updated"
      >
      </QJsonTreeEditorNode>
    </div>
    <div class="col-shrink">
      <pre>{{ localData }}</pre>
    </div>
  </div>
  <q-separator />
</template>

<style scoped></style>
