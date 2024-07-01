<script setup>
import { reactive, ref } from 'vue';
import { vd } from '../../../src/components';

const users = [
  {
    id: 1,
    name: 'Test user 1',
  },
  {
    id: 2,
    name: 'Test user 2',
  },
];

const data = reactive({
  productName: 'An ice sculpture',
  productType: '',
  productOwner: users[0],
});

const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  title: 'Product',
  description: "A product from Acme's catalog",
  type: 'object',
  params: {
    container: 'Division',
  },
  properties: {
    productName: {
      description: 'Name of the product',
      type: 'string',
    },
    productType: {
      description: 'Type of the product (string)',
      type: 'string',
      params: {
        component: 'select',
        label: 'Test Select Label',
        options: ['Test option 1', 'Test option 2', 'Test option 3'],
      },
    },
    productOwner: {
      description: 'Owner of the product (object)',
      type: 'object',
      params: {
        component: 'select',
        label: 'Test Select Label',
        optionLabel: 'name',
        options: users,
      },
    },
  },
};

const updated = (tmp) => {
  vd('updated root');
  vd(tmp);
  // vd(data);
};
const sep1 = ref(70);
</script>

<template>
  <q-page padding class="">
    <q-splitter v-model="sep1" vertical>
      <template v-slot:before>
        <h4>Usage of select component</h4>
        <QJsonTreeEditor
          v-model="data"
          :schema="jsonSchema"
          @updated="updated"
          class="q-ma-sm"
        >
        </QJsonTreeEditor>
      </template>
      <template v-slot:after>
        <pre>{{ data }}</pre>
      </template>
    </q-splitter>
  </q-page>
</template>

<style lang="sass">
.q-json-tree-node
  margin-left: 16px

.q-json-tree-node-division
  border: 0
  margin-bottom: 6px
  margin-left: 6px

.q-json-tree-field
  background-color: #eee
  border: 0
  padding: 12px

.q-json-tree-field-select
  background-color: #ddd
  border: 0
  padding: 12px

.q-json-tree-object
  border: 0
</style>
