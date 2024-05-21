<script setup>
import { computed, ref, toRef } from 'vue';
import { useDraggable } from 'vue-draggable-plus';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import ButtonAddToArray from '../buttons/ButtonAddToArray.vue';

const props = defineProps({
  modelValue: { default: () => {} },
  schema: {
    type: Object,
    default: () => {},
  },
  propKey: {
    type: String,
    default: () => 'unknown',
  },
});

const emits = defineEmits(['update:modelValue', 'updated']);
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value);
    updated({
      propKey: props.propKey,
      wasSorted: true,
      newValue: value,
      oldValue: oldValue.value,
      path: [],
    });
  },
});

const localSchema = toRef(props, 'schema');

const updated = (data) => {
  emits('updated', data);
};

const el = ref(null);
const oldValue = ref(null);
const draggable = useDraggable(el, localData, {
  animation: 150,
  onStart() {
    oldValue.value = localData.value;
    console.log('start');
  },
  onUpdate() {},
  onEnd() {},
});
</script>

<template>
  <div ref="el">
    <q-item
      v-for="localDataFieldKey of Object.keys(localData)"
      :key="'field_' + propKey + '_' + localDataFieldKey"
      class="q-ma-sm"
    >
      <q-item-section avatar style="min-width: 20px; width: 20px">
        <q-icon name="drag_handle" />
      </q-item-section>
      <q-item-section>
        <QJsonTreeEditorField
          :propKey="'field_' + localDataFieldKey"
          v-model="localData[localDataFieldKey]"
          :schema="localSchema.items"
          @updated="updated"
          @drop="localData?.splice(localDataFieldKey, 1)"
        />
      </q-item-section>
    </q-item>
  </div>
  <q-separator />
  <ButtonAddToArray
    class="q-pl-md"
    v-model="localData"
    :schema="localSchema"
    :propKey="propKey"
  />
</template>
