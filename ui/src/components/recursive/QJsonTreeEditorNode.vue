<script setup>
import { ref, toRef } from 'vue';
import {
  addItemByType,
  clearItemByType,
  computedLocalData,
  hasChildren,
  isScalar,
} from '../index';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import QJsonTreeHeader from './QJsonTreeHeader.vue';
import QJsonTreeEditorElement from './QJsonTreeEditorElement.vue';
import QJsonTreeEditorMenu from './QJsonTreeEditorMenu.vue';

const props = defineProps(['modelValue', 'schema', 'parentSchema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');
const expansionItemState = ref(true);

const updated = (data) => {
  data.path.push(props.propKey);
  emits('updated', data);
};

const addItem = addItemByType(localData, localSchema);
const clearItem = clearItemByType(localData, localSchema);
</script>

<template>
  <QJsonTreeEditorField
    v-if="isScalar(localSchema).value"
    v-model="localData"
    :schema="localSchema"
    :propKey="propKey"
    @updated="updated"
    @drop="localData = undefined"
  />

  <q-expansion-item
    v-if="
      localSchema.params?.expansible !== false && hasChildren(localSchema).value
    "
    dense
    class="q-json-tree-node"
    header-style="background-color: #eee;"
    v-model="expansionItemState"
  >
    <template v-slot:header>
      <QJsonTreeHeader :schema="localSchema" :propKey="propKey" />
      <QJsonTreeEditorMenu
        v-model="localData"
        :schema="localSchema"
        :parentSchema="parentSchema"
        :propKey="propKey"
        @click.stop
        @add="addItem"
        @clear="clearItem"
        @drop="localData = undefined"
      ></QJsonTreeEditorMenu>
    </template>

    <QJsonTreeEditorElement
      v-model="localData"
      :propKey="propKey"
      :schema="localSchema"
      @updated="updated"
    />
  </q-expansion-item>

  <q-item
    v-else-if="
      localSchema.params?.expansible === false && hasChildren(localSchema).value
    "
    dense
  >
    <q-item-section>
      <QJsonTreeEditorElement
        v-model="localData"
        :propKey="propKey"
        :schema="localSchema"
        @updated="updated"
      />
    </q-item-section>
    <q-item-section side class="absolute-top">
      <QJsonTreeEditorMenu
        v-model="localData"
        :schema="localSchema"
        :parentSchema="parentSchema"
        :propKey="propKey"
        @click.stop
        @add="addItem"
        @clear="clearItem"
        @drop="localData = undefined"
      ></QJsonTreeEditorMenu>
    </q-item-section>
  </q-item>
</template>

<style scoped>
.q-json-tree-node {
  margin-left: 12px;
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
</style>
