<script setup>
import QJsonTreeNode from '../containers/QJsonTreeNode.vue';
import QJsonTreeField from '../fields/QJsonTreeField.vue';
import ButtonAddObjectProperty from '../buttons/ButtonAddObjectProperty.vue';
import {
  clearItemByType,
  getPropertyKey,
  hasChildren,
  setupDefaults,
  vd,
} from '../index';

const props = defineProps(setupDefaults.props);
const emits = defineEmits(setupDefaults.emits);
const { localData, localSchema, parentSchema, propKey, updated } =
  setupDefaults.local(props, emits);

const clear = clearItemByType(localData, localSchema);
const drop = () => {
  vd('drop ');
};
</script>

<template>
  <q-item
    v-for="(schema, index) in Object.values(localSchema.properties)"
    :key="'prop_' + index"
    class="q-json-tree-object q-pa-none q-ma-none"
  >
    <div
      v-if="
        !localData ||
        localData[getPropertyKey(index, localSchema)] === undefined
      "
    >
      <ButtonAddObjectProperty
        v-model="localData"
        :schema="schema"
        :propKey="getPropertyKey(index, localSchema)"
      />
    </div>

    <q-item-section v-else>
      <QJsonTreeNode
        v-if="hasChildren(localSchema).value"
        v-model="localData[getPropertyKey(index, localSchema)]"
        :schema="schema"
        :parentSchema="localSchema"
        :propKey="getPropertyKey(index, localSchema)"
        @updated="updated"
        @drop="localData[getPropertyKey(index, localSchema)] = undefined"
      />
      <QJsonTreeField
        v-else
        v-model="localData[getPropertyKey(index, localSchema)]"
        :schema="schema"
        :parentSchema="localSchema"
        :propKey="getPropertyKey(index, localSchema)"
        @updated="updated"
        @drop="drop"
      />
    </q-item-section>
  </q-item>
</template>
