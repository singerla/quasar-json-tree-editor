<script setup>
import { computed, toRef } from 'vue';
import { isBoolean, isNumeric, isObject, valueBySchema } from '../index';
import QJsonTreeEditorObject from './QJsonTreeEditorObject.vue';
import ButtonDrop from '../buttons/ButtonDrop.vue';
import FieldColorPicker from '../fields/FieldColorPicker.vue';
import FieldSlider from '../fields/FieldSlider.vue';

const props = defineProps(['modelValue', 'schema', 'propKey']);
const emits = defineEmits(['update:modelValue', 'updated', 'drop']);

const localSchema = toRef(props, 'schema');
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    value = valueBySchema(value, localSchema.value);
    initUpdated(value, props.modelValue);
    emits('update:modelValue', value);
  },
});

const initUpdated = (newValue, oldValue) => {
  emits('updated', {
    propKey: props.propKey,
    newValue,
    oldValue,
    path: [],
  });
};

const updated = (data) => {
  emits('updated', data);
};

const drop = () => {
  emits('drop');
};
</script>

<template>
  <q-item>
    <q-item-section>
      <QJsonTreeEditorObject
        v-if="isObject(localSchema).value"
        v-model="localData"
        :schema="localSchema"
        :propKey="propKey"
        @updated="updated"
      />

      <FieldColorPicker
        v-else-if="localSchema.component === 'ColorPicker'"
        v-model="localData"
      >
      </FieldColorPicker>

      <FieldSlider
        v-else-if="localSchema.component === 'Slider'"
        :schema="localSchema"
        :propKey="propKey"
        v-model="localData"
      >
      </FieldSlider>

      <q-checkbox
        v-else-if="isBoolean(localSchema).value"
        dense
        :label="propKey"
        v-model="localData"
      />
      <q-input
        v-else-if="isNumeric(localSchema).value"
        dense
        :label="propKey"
        v-model="localData"
        type="number"
      />
      <q-input v-else dense :label="propKey" v-model="localData" />
    </q-item-section>

    <q-item-section side>
      <ButtonDrop @click="drop" color="grey-5" icon="cancel" />
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
