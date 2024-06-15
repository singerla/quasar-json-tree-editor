<script setup>
import { toRef } from 'vue';
import { computedLocalData } from '../index';
import QJsonTreeElement from './QJsonTreeElement.vue';
import QJsonTreeHeader from './headers/QJsonTreeHeader.vue';
import QJsonTreeMenu from '../menus/QJsonTreeMenu.vue';

const props = defineProps(['modelValue', 'schema', 'parentSchema', 'propKey']);
const emits = defineEmits([
  'update:modelValue',
  'updated',
  'add',
  'drop',
  'clear',
]);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');
const updated = (data) => {
  emits('updated', data);
};
</script>

<template>
  <div class="q-json-tree-node-division">
    <QJsonTreeHeader :schema="localSchema" :propKey="propKey">
      <template v-slot:menu>
        <QJsonTreeMenu
          v-model="localData"
          :schema="localSchema"
          :parentSchema="parentSchema"
          :propKey="propKey"
          @click.stop
          @drop="emits('drop')"
          @add="emits('add')"
          @clear="emits('clear')"
        />
      </template>
    </QJsonTreeHeader>

    <QJsonTreeElement
      v-model="localData"
      :propKey="propKey"
      :schema="localSchema"
      @updated="updated"
    >
      <template v-slot:buttonAddToArray>
        <slot name="buttonAddToArray"></slot>
      </template>
    </QJsonTreeElement>
  </div>
</template>
