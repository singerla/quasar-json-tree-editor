<script setup>
import { ref } from 'vue';
import { setupDefaults } from '../index';
import QJsonTreeHeader from './QJsonTreeHeader.vue';
import QJsonTreeElement from './QJsonTreeElement.vue';
import QJsonTreeMenu from '../menus/QJsonTreeMenu.vue';

const props = defineProps(setupDefaults.props);
const emits = defineEmits(setupDefaults.emits);
const { localData, localSchema, parentSchema, propKey, updated } =
  setupDefaults.local(props, emits);

const expansionItemState = ref(true);
</script>

<template>
  <q-expansion-item
    dense
    class="q-json-tree-node-expansion q-pa-none q-ma-none"
    header-style="background-color: #eee; margin: 0; padding: 0"
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
            @drop="emits('drop')"
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
