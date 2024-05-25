<script setup>
import { ref, toRef } from 'vue';
import { computedLocalData } from '../index';
import QJsonTreeHeader from './QJsonTreeHeader.vue';
import QJsonTreeElement from './QJsonTreeElement.vue';
import QJsonTreeMenu from '../menus/QJsonTreeMenu.vue';

const props = defineProps(['modelValue', 'schema', 'parentSchema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated', 'add', 'clear']);
const localData = computedLocalData(props, emits);
const localSchema = toRef(props, 'schema');
const expansionItemState = ref(true);

const updated = (data) => {
  emits('updated', data);
};
</script>

<template>
  <q-expansion-item
    dense
    class="q-json-tree-node-expansion"
    header-style="background-color: #eee;"
    v-model="expansionItemState"
  >
    <template v-slot:header>
      <QJsonTreeHeader :schema="localSchema" :propKey="propKey">
        <template v-slot:icon>
          <q-icon name="account_tree" />
        </template>
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
    </template>

    <QJsonTreeElement
      v-model="localData"
      :propKey="propKey"
      :schema="localSchema"
      @updated="updated"
    />
  </q-expansion-item>
</template>

<style scoped></style>
