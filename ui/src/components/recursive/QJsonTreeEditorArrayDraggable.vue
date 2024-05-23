<script setup>
import { ref, toRef } from 'vue';
import { useDraggable } from 'vue-draggable-plus';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import { computedLocalData } from '../index';

const props = defineProps(['modelValue', 'schema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated', 'add']);
const localData = computedLocalData(props, emits, null, (value) => {
  updated({
    propKey: props.propKey,
    wasSorted: true,
    newValue: value,
    oldValue: oldValue.value,
    path: [],
  });
});
const localSchema = toRef(props, 'schema');
const updated = (data) => {
  emits('updated', data);
};

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

const clear = () => (localData.value = []);
</script>

<template>
  <div ref="el">
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
        <QJsonTreeEditorField
          :propKey="'field_' + propKey + '_' + localDataFieldKey"
          v-model="localData[localDataFieldKey]"
          :schema="localSchema.items"
          :parentSchema="localSchema"
          @updated="updated"
          @drop="localData?.splice(localDataFieldKey, 1)"
          @add="emits('add')"
          @clear="clear"
        />
      </q-item-section>
    </q-item>
  </div>
</template>
