<script setup>
import { addItemByType, clearItemByType, setupDefaults } from '../index';
import QJsonTreeNodeExpansion from './QJsonTreeNodeExpansion.vue';
import QJsonTreeNodeCard from './QJsonTreeNodeCard.vue';
import QJsonTreeNodeDivision from './QJsonTreeNodeDivision.vue';

const props = defineProps(setupDefaults.props);
const emits = defineEmits(setupDefaults.emits);
const { localData, localSchema, parentSchema, propKey } = setupDefaults.local(
  props,
  emits
);

const updated = (data) => {
  data.path.push(props.propKey);
  emits('updated', data);
};

const addItem = addItemByType(localData, localSchema);
const clearItem = clearItemByType(localData, localSchema);

const components = {
  Card: QJsonTreeNodeCard,
  Expansion: QJsonTreeNodeExpansion,
  Division: QJsonTreeNodeDivision,
};
const componentKey = localSchema.value.params?.container;
const component = components[componentKey] || components.Division;
</script>

<template>
  <div class="q-json-tree-node">
    <component
      :is="component"
      v-model="localData"
      :propKey="propKey"
      :schema="localSchema"
      :parentSchema="parentSchema"
      @add="addItem"
      @clear="clearItem"
      @drop="emits('drop')"
      @updated="updated"
    />
  </div>
</template>
