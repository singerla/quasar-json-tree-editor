<script setup>
import { setupDefaults } from '../index';
import QJsonTreeElement from './QJsonTreeElement.vue';
import QJsonTreeMenu from '../menus/QJsonTreeMenu.vue';
import QJsonTreeHeader from './QJsonTreeHeader.vue';

const props = defineProps(setupDefaults.props);
const emits = defineEmits(setupDefaults.emits);
const { localData, localSchema, parentSchema, propKey, updated } =
  setupDefaults.local(props, emits);
</script>

<template>
  <q-card class="q-json-tree-node-card">
    <q-card-section class="q-pa-none q-ma-none">
      <QJsonTreeHeader :schema="localSchema" :propKey="propKey">
        <template v-slot:icon>
          <q-icon name="data_object" />
        </template>
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
    </q-card-section>

    <q-card-section class="q-pa-none q-ma-none">
      <QJsonTreeElement
        v-model="localData"
        :propKey="propKey"
        :schema="localSchema"
        @updated="updated"
      />
    </q-card-section>
  </q-card>
</template>
