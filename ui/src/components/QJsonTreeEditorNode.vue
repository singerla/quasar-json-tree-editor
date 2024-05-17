<script setup>
import { computed, ref, toRef } from 'vue';
import QJsonTreeEditorField from './QJsonTreeEditorField.vue';
import { vd } from './index';
import QJsonTreeEditorObject from './QJsonTreeEditorObject.vue';

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

const emits = defineEmits(['update:modelValue']);
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    vd('updated node');
    vd(value);
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
</script>

<template>
  <q-expansion-item
    v-if="localSchema.type === 'array' || localSchema.type === 'object'"
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
            {{ localSchema.description }}
          </q-item-label>
          <q-item-label caption>
            {{ 'Key: ' + propKey }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <q-item v-if="!localSchema.properties">
      <q-item-section>
        <QJsonTreeEditorField
          v-if="localSchema.type !== 'array'"
          v-model="localData"
          :schema="localSchema"
        />
        <div v-else>
          <QJsonTreeEditorField
            v-for="localDataFieldKey of Object.keys(localData)"
            :key="'field_' + localDataFieldKey"
            v-model="localData[localDataFieldKey]"
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
        <QJsonTreeEditorObject :schema="localSchema" v-model="localData" />
      </q-item-section>
    </q-item>
  </q-expansion-item>

  <q-item v-else>
    <q-item-section>
      <QJsonTreeEditorField
        v-model="localData"
        :schema="localSchema"
        :propKey="propKey"
      />
    </q-item-section>
  </q-item>
</template>
