<script setup>
import { computed, ref, toRef } from 'vue';
import { hasChildren, isArray, isObject, isScalar } from '../index';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import QJsonTreeEditorObject from './QJsonTreeEditorObject.vue';
import QJsonTreeHeader from '../QJsonTreeHeader.vue';
import ButtonAddToArray from '../buttons/ButtonAddToArray.vue';
import ButtonDrop from '../buttons/ButtonDrop.vue';

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

const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value);
  },
});

const localSchema = toRef(props, 'schema');
const expansionItemState = ref(true);

const updated = (data) => {
  data.path.push(props.propKey);
  emits('updated', data);
};
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
    v-if="hasChildren(localSchema).value"
    dense
    class="q-json-tree-node"
    header-style="background-color: #eee;"
    v-model="expansionItemState"
  >
    <template v-slot:header>
      <QJsonTreeHeader :schema="localSchema" :propKey="propKey" />
      <ButtonDrop v-if="propKey !== 'root'" @drop="localData = undefined" />
    </template>

    <QJsonTreeEditorField
      v-if="isScalar(localSchema).value"
      v-model="localData"
      :propKey="propKey"
      :schema="localSchema"
      @updated="updated"
    />

    <QJsonTreeEditorObject
      v-else-if="isObject(localSchema).value"
      :schema="localSchema"
      :propKey="propKey"
      v-model="localData"
      @updated="updated"
    />

    <div v-else-if="isArray(localSchema).value">
      <div
        v-for="localDataFieldKey of Object.keys(localData)"
        :key="'field_' + propKey + '_' + localDataFieldKey"
        class="q-ma-sm"
      >
        <QJsonTreeEditorField
          :propKey="'field_' + localDataFieldKey"
          v-model="localData[localDataFieldKey]"
          :schema="localSchema.items"
          @updated="updated"
          @drop="localData?.splice(localDataFieldKey, 1)"
        />
      </div>
      <ButtonAddToArray
        class="q-pl-md"
        v-model="localData"
        :schema="localSchema"
        :propKey="propKey"
      />
    </div>
  </q-expansion-item>
</template>

<style scoped>
.q-json-tree-node {
  margin-left: 12px;
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
</style>
