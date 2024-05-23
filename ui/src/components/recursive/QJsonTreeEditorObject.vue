<script setup>
import { computed, toRef } from 'vue';
import QJsonTreeEditorNode from './QJsonTreeEditorNode.vue';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import ButtonAddObjectProperty from '../buttons/ButtonAddObjectProperty.vue';
import { computedLocalData, getPropertyKey, hasChildren } from '../index';

const props = defineProps(['modelValue', 'schema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');

const updated = (data) => {
  emits('updated', data);
};
</script>

<template>
  <q-item
    v-for="(schema, index) in Object.values(localSchema.properties)"
    :key="'prop_' + index"
  >
    <q-item-section>
      <ButtonAddObjectProperty
        v-if="
          !localData ||
          localData[getPropertyKey(index, localSchema)] === undefined
        "
        v-model="localData"
        :schema="schema"
        :propKey="getPropertyKey(index, localSchema)"
      />

      <QJsonTreeEditorNode
        v-else-if="hasChildren(localSchema).value"
        v-model="localData[getPropertyKey(index, localSchema)]"
        :schema="schema"
        :parentSchema="localSchema"
        :propKey="getPropertyKey(index, localSchema)"
        @updated="updated"
      />

      <QJsonTreeEditorField
        v-else
        v-model="localData[getPropertyKey(index, localSchema)]"
        :schema="schema"
        :parentSchema="localSchema"
        :propKey="getPropertyKey(index, localSchema)"
        @updated="updated"
        @drop="localData = undefined"
      />
    </q-item-section>
  </q-item>
</template>
