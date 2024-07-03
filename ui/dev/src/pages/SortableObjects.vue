<script setup>
import { reactive, ref } from 'vue';
import { vd } from '../../../src/components';

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
    prop1: {
      params: {
        container: 'Expansion',
        sortable: true,
        showAddButton: true,
        group: {
          name: 'objects',
        },
      },
      type: 'array',
      title: 'Product',
      // description: "A product from Acme's catalog",
      items: {
        type: 'object',
        params: {
          header: {
            sections: ['index', 'space', 'menu'],
          },
        },
        properties: {
          id: {
            label: 'Product ID',
            description: 'The unique identifier for a product',
            type: 'integer',
          },
          productName: {
            description: 'Name of the product',
            type: 'string',
          },
        },
      },
    },
    prop2: {
      params: {
        container: 'Division',
        sortable: true,
        showAddButton: true,
        group: {
          name: 'objects',
        },
      },
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            description: 'The unique identifier for a product',
            type: 'integer',
          },
          productName: {
            description: 'Name of the product',
            type: 'string',
          },
        },
      },
    },
  },
};

const data = reactive({
  prop1: [
    {
      id: 13,
      productName: 'Test 1-3',
    },
    {
      id: 12,
      productName: 'Test 1-2',
    },
    {
      id: 11,
      productName: 'Test 1-1',
    },
  ],
  prop2: [
    {
      id: 21,
      productName: 'Test 2-1',
    },
    {
      id: 22,
      productName: 'Test 2-2',
    },
    {
      id: 23,
      productName: 'Test 2-3',
    },
  ],
});

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
        <h4>Sortable objects</h4>
        <QJsonTreeEditor
          v-model="data"
          :schema="jsonSchema"
          @updated="updated"
          class="q-ma-sm"
        />
      </template>
      <template v-slot:after>
        <pre>{{ data }}</pre>
      </template>
    </q-splitter>
  </q-page>
</template>

<style lang="sass">
.q-json-tree-node
  margin-left: 8px

.q-json-tree-header
  padding: 12px
  border-bottom: 1px solid maroon

.q-json-tree-list
  background-color: #eee

.q-json-tree-list-item
  border-bottom: 1px solid #eeeeee

.q-json-tree-node-card
  margin-left: 6px
  padding: 0

.q-json-tree-node-expansion
  padding: 0
  margin: 0 6px 6px 6px
  border: 0px dotted green

.q-json-tree-node-division
  padding: 0
  margin: 0 6px 6px 6px
  border: 0px dotted orange

.q-json-tree-field
  padding: 6px
  margin: 6px
  margin-bottom: 24px
  background-color: #eee
  border: 0
</style>
