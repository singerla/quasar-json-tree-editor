<script setup>
import QJsonTreeEditorNode from "./QJsonTreeEditorNode.vue";
import { toRef, watch, watchEffect } from "vue";

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

const internalData = toRef(props, "data");
const internalSchema = toRef(props, "schema");

watch(
  internalData,
  () => {
    console.log("updated data");
    // validate and send to api
  },
  { deep: true }
);
</script>

<template>
  <QJsonTreeEditorNode
    :schema="internalSchema"
    :data="internalData"
    propKey="root"
  >
  </QJsonTreeEditorNode>
  <q-separator />
  <pre>{{ internalData }}</pre>
</template>

<style scoped></style>
