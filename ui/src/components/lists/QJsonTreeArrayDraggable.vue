<script setup>
import { ref } from 'vue';
import { useDraggable } from 'vue-draggable-plus';
import QJsonTreeField from '../fields/QJsonTreeField.vue';
import { computedLocalData, setupDefaults } from '../index';

const props = defineProps(setupDefaults.props);
const emits = defineEmits(setupDefaults.emits);
const { localSchema, parentSchema, propKey, updated } = setupDefaults.local(
  props,
  emits
);
const localData = computedLocalData(props, emits, null, (value) => {
  updated({
    propKey: props.propKey,
    wasSorted: true,
    newValue: value,
    oldValue: oldValue.value,
    path: [],
  });
});

const el = ref(null);
const oldValue = ref(null);
const draggable = useDraggable(el, localData, {
  animation: 150,
  group: {
    ...localSchema.value.params?.group,
  },
  onStart() {
    oldValue.value = localData.value;
    console.log('start');
  },
  onUpdate() {},
  onEnd() {},
});
</script>

<template>
  <q-list ref="el" class="q-json-tree-list">
    <q-item
      dense
      v-for="localDataFieldKey of Object.keys(localData)"
      :key="'field_' + propKey + '_' + localDataFieldKey + '_' + Math.random()"
      class="q-json-tree-list-item"
    >
      <q-item-section avatar style="min-width: 20px; width: 20px">
        <q-icon name="drag_indicator" />
      </q-item-section>
      <q-item-section>
        <QJsonTreeField
          :propKey="'field_' + propKey + '_' + localDataFieldKey"
          v-model="localData[localDataFieldKey]"
          :schema="localSchema.items"
          :parentSchema="localSchema"
          @updated="updated"
          @drop="emits('drop', localDataFieldKey)"
          @add="emits('add')"
          @clear="emits('clear')"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
