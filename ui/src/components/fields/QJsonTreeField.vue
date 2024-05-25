<script setup>
import { toRef } from 'vue';
import {
  clearItemByType,
  computedLocalData,
  isArray,
  isBoolean,
  isNumeric,
  isObject,
  valueBySchema,
  vd,
} from '../index';
import QJsonTreeEditorObject from '../lists/QJsonTreeObject.vue';
import FieldColorPicker from './quasar/FieldColorPicker.vue';
import FieldSlider from './quasar/FieldSlider.vue';
import QJsonTreeArray from '../lists/QJsonTreeArray.vue';
import QJsonTreeMenu from '../menus/QJsonTreeMenu.vue';

const props = defineProps(['modelValue', 'schema', 'propKey', 'parentSchema']);
const emits = defineEmits(['update:modelValue', 'updated', 'add', 'drop']);

const localSchema = toRef(props, 'schema');
const localData = computedLocalData(props, emits, (value) => {
  value = valueBySchema(value, localSchema.value);
  initUpdated(value, props.modelValue);
  return value;
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
const add = () => {
  emits('add');
};
const drop = () => {
  vd('field emits drop');
  emits('drop');
};
const clear = clearItemByType(localData, localSchema);
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

      <QJsonTreeArray
        v-else-if="isArray(localSchema).value"
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
      <QJsonTreeMenu
        v-model="localData"
        :schema="localSchema"
        :parentSchema="parentSchema"
        :propKey="propKey"
        @add="add"
        @clear="clear"
        @drop="drop"
      ></QJsonTreeMenu>
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
