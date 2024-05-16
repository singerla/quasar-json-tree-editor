<script setup>
import { ref, toRef } from 'vue';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import { vd } from './index';
import QJsonTreeEditorObject from './QJsonTreeEditorObject.vue';

const props = defineProps({
  data: {
    default: () => null,
  },
  schema: {
    type: Object,
    default: () => {},
  },
  // This is useful if no description was sent
  propKey: {
    type: String,
    default: () => 'unknown',
  },
});

const localSchema = toRef(props, 'schema');
const localData = toRef(props, 'data');

const expansionItemState = ref(true);
const emits = defineEmits(['updated']);

const addItem = () => {
  localData.value.push('');
};
const getPropertyKey = (index) =>
  Object.keys(localSchema.value.properties)[index];

const updateSingleField = (newValue) => {
  vd('updateSingleField');
  emits('updated', newValue);
};
const updateArrayField = (localDataFieldKey, newValue) => {
  vd('updateArrayField');
  localData.value[localDataFieldKey] = newValue;
  emits('updated', localData);
};
const updatedObject = (index, newValue) => {
  vd('updatedObject');
  emits('updated', localData);
};
</script>

<template>
  <q-expansion-item
    dense
    style="border: 1px solid #ccc"
    header-style="background-color: #ddd;"
    v-model="expansionItemState"
  >
    <template v-slot:header>
      <q-item class="q-pa-none full-width">
        <q-item-section avatar>
          <q-icon name="account_tree" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ localSchema.description || 'Key: ' + propKey }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <q-item v-if="!localSchema.properties">
      <q-item-section>
        <QJsonTreeEditorField
          v-if="localSchema.type !== 'array'"
          :data="localData"
          @updated="updateSingleField"
          :schema="localSchema"
        />
        <div v-else>
          <QJsonTreeEditorField
            v-for="(localDataField, localDataFieldKey) in localData"
            :key="'field_' + localDataFieldKey"
            :data="localDataField"
            @updated="(newVal) => updateArrayField(localDataFieldKey, newVal)"
            :schema="localSchema.items"
          />
          <q-item-section side>
            <q-btn
              icon="add"
              @click="addItem"
              size="sm"
              color="primary"
              class="q-mt-sm q-pa-sm"
              rounded
            />
          </q-item-section>
        </div>
      </q-item-section>
      <q-item-section avatar>
        <q-chip :label="localSchema.type" />
      </q-item-section>
    </q-item>

    <q-item class="q-pl-sm" v-else>
      <q-item-section>
        <!--        <draggable>-->
        <QJsonTreeEditorObject
          :data="localData"
          :schema="localSchema"
          @updated="updatedObject"
        />
        <!--        </draggable>-->
      </q-item-section>
    </q-item>
  </q-expansion-item>
</template>
