<script lang="js" setup>
import QJsonTreeEditorNode from './containers/QJsonTreeNode.vue';
import { setupDefaults } from './index';

const props = defineProps(setupDefaults.props);
const emits = defineEmits(setupDefaults.emits);
const { localData, localSchema, propKey, updated } = setupDefaults.local(
  props,
  emits
);
</script>

<template>
  <QJsonTreeEditorNode
    :schema="localSchema"
    v-model="localData"
    propKey="root"
    @updated="updated"
  />
</template>
