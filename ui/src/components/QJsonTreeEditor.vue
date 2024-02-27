<script setup>
import QJsonTreeEditorNode from "./QJsonTreeEditorNode.vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <QJsonTreeEditorNode
    v-for="(item, index) in data"
    :key="index"
    :data="item"
  ></QJsonTreeEditorNode>
  <q-separator />
  <pre>{{ data }}</pre>
</template>

<style scoped></style>
