<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <q-expansion-item :label="data.value">
    <q-list class="q-pl-sm" v-if="data.children?.length > 0">
      <QJsonTreeEditorNode
          v-for="(item, index) in data.children"
          :key="index"
          :data="item"
      >
      </QJsonTreeEditorNode>
    </q-list>

    <div class="q-pl-sm" v-if="data.component === 'textfield'">
      <q-input v-model="data.value" label="Textfield" />
    </div>
  </q-expansion-item>
</template>

<style scoped></style>
