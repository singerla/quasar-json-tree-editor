<script setup>
import QJsonTreeEditorNode from './QJsonTreeEditorNode.vue';
import { toRef } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => [],
  },
  schema: {
    type: Object,
    default: () => {},
  },
});

const localData = toRef(props, 'data');
const emits = defineEmits(['updated']);

const onUpdated = (newValue) => {
  console.log('onUpdated@editor');
  console.log(newValue);
  emits('updated', newValue);
};
</script>

<template>
  <div class="row">
    <div class="col-grow">
      <QJsonTreeEditorNode
        :schema="schema"
        :data="data"
        @updated="onUpdated"
        propKey="root"
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
