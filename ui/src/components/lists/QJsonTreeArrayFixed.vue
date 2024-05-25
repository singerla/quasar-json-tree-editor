<script setup>
import QJsonTreeField from '../fields/QJsonTreeField.vue';
import { setupDefaults } from '../index';

const props = defineProps(setupDefaults.props);
const emits = defineEmits(setupDefaults.emits);
const { localData, localSchema, parentSchema, propKey, updated } =
  setupDefaults.local(props, emits);
</script>

<template>
  <q-list class="q-json-tree-list q-pa-none q-ma-none">
    <q-item
      dense
      v-for="localDataFieldKey of Object.keys(localData)"
      :key="'field_' + propKey + '_' + localDataFieldKey"
      class="q-json-tree-list-item q-pa-none q-ma-none"
    >
      <q-item-section>
        <QJsonTreeField
          :propKey="'field_' + localDataFieldKey"
          v-model="localData[localDataFieldKey]"
          :schema="localSchema.items"
          :parentSchema="localSchema"
          @updated="updated"
          @drop="localData?.splice(localDataFieldKey, 1)"
          @add="emits('add')"
          @clear="emits('clear')"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
