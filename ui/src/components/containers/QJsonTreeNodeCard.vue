<script setup>
import { toRef } from 'vue';
import { computedLocalData } from '../index';
import QJsonTreeElement from './QJsonTreeElement.vue';
import QJsonTreeMenu from '../menus/QJsonTreeMenu.vue';
import QJsonTreeHeader from './QJsonTreeHeader.vue';

const props = defineProps(['modelValue', 'schema', 'parentSchema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated', 'add', 'clear']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');

const updated = (data) => {
  emits('updated', data);
};
</script>

<template>
  <q-card class="q-json-tree-node-card">
    <q-card-section>
      <QJsonTreeHeader :schema="localSchema" :propKey="propKey">
        <template v-slot:menu>
          <QJsonTreeMenu
            v-model="localData"
            :schema="localSchema"
            :parentSchema="parentSchema"
            :propKey="propKey"
            @click.stop
            @add="emits('add')"
            @clear="emits('clear')"
          />
        </template>
      </QJsonTreeHeader>
    </q-card-section>

    <q-card-section>
      <QJsonTreeElement
        v-model="localData"
        :propKey="propKey"
        :schema="localSchema"
        @updated="updated"
      />
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
