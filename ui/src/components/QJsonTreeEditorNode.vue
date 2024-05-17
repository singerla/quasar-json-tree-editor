<script setup>
import { computed, ref, toRef } from 'vue';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import { vd } from './index';
import QJsonTreeEditorObject from './QJsonTreeEditorObject.vue';
import QJsonTreeHeader from './QJsonTreeHeader.vue';
import QJsonTreeButtonAdd from './QJsonTreeButtonAdd.vue';

const props = defineProps({
  modelValue: {
    default: () => [],
  },
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
  },
});

const localSchema = toRef(props, 'schema');
const expansionItemState = ref(true);

const addItem = () => {
  if (localSchema.value.type === 'array') {
    if (localSchema.value.items.properties) {
      const addKeys = Object.keys(localSchema.value.items.properties);
      const add = {};
      addKeys.forEach((addKey) => {
        add[addKey] = null;
      });
      localData.value.push(add);
    } else {
      localData.value.push('');
    }
  } else {
    localData.value.push('');
  }
};

const updated = (data) => {
  data.path.push(props.propKey);
  emits('updated', data);
};
</script>

<template>
  <q-expansion-item
    v-if="localSchema.type === 'array' || localSchema.type === 'object'"
    dense
    class=""
    style="border: 1px solid #ccc"
    header-style="background-color: #ddd;"
    v-model="expansionItemState"
  >
    <template v-slot:header>
      <QJsonTreeHeader :schema="localSchema" :propKey="propKey" />
    </template>

    <q-item v-if="!localSchema.properties" class="">
      <q-item-section>
        <QJsonTreeEditorField
          v-if="localSchema.type !== 'array'"
          v-model="localData"
          :schema="localSchema"
          @updated="updated"
        />
        <div v-else>
          <div
            v-for="localDataFieldKey of Object.keys(localData)"
            :key="'field_' + localDataFieldKey"
            class="shadow-2 q-ma-sm"
          >
            <QJsonTreeEditorField
              :propKey="'field_' + localDataFieldKey"
              v-model="localData[localDataFieldKey]"
              :schema="localSchema.items"
              @updated="updated"
              @drop="localData.splice(localDataFieldKey, 1)"
            />
          </div>
          <QJsonTreeButtonAdd @onAdd="addItem" />
        </div>
      </q-item-section>
    </q-item>

    <q-item class="q-pl-md" v-if="localSchema.properties">
      <q-item-section>
        <QJsonTreeEditorObject
          :schema="localSchema"
          :propKey="propKey"
          v-model="localData"
          @updated="updated"
        />
      </q-item-section>
    </q-item>
  </q-expansion-item>

  <q-item v-else>
    <q-item-section>
      <QJsonTreeEditorField
        v-model="localData"
        :schema="localSchema"
        :propKey="propKey"
        @updated="updated"
        @drop="localData = undefined"
      />
    </q-item-section>
  </q-item>
</template>
