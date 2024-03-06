<script setup>
import QJsonTreeEditorNode from "./QJsonTreeEditorNode.vue";
import { toRefs, ref, watchEffect, toRef } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

let internalData = toRef()

watchEffect(() => {
  internalData = props.data
})

</script>

<template>
  <QJsonTreeEditorNode v-for="(item, index) in internalData" :key="index" :data="item" label="root">
  </QJsonTreeEditorNode>
  <q-separator />
  <pre>{{ internalData }}</pre>
</template>

<style scoped></style>
