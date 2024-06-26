<script setup>
import { h, ref } from 'vue';
import { vd } from '../../../src/components';

const data = ref({
  productId: 1,
  productName: 'An ice sculpture',
  price: 12.5,
  tags: ['cold', 'ice'],
  dimensions: {
    length: 7.0,
    width: 12.0,
    height: 9.5,
    tags: ['nested', 'cold', 'ice'],
  },
});

const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  title: 'Product',
  description: "A product from Acme's catalog",
  type: 'object',
  params: {
    container: 'Expansion',
  },
  properties: {
    productId: {
      description: 'The unique identifier for a product',
      type: 'integer',
    },
    productName: {
      description: 'Name of the product',
      type: 'string',
    },
    price: {
      description: 'The price of the product',
      type: 'number',
      exclusiveMinimum: 0,
    },
    tags: {
      description: 'Tags for the product',
      type: 'array',
      items: {
        type: 'string',
      },
      minItems: 1,
      uniqueItems: true,
      params: {
        container: 'Card',
        showAddButton: true,
      },
    },
    dimensions: {
      type: 'object',
      properties: {
        length: {
          type: 'number',
        },
        width: {
          type: 'number',
        },
        height: {
          type: 'number',
        },
        tags: {
          description: 'Nested tags for the product',
          type: 'array',
          items: {
            type: 'string',
          },
          minItems: 1,
          uniqueItems: true,
        },
      },
      required: ['length', 'width', 'height'],
    },
  },
  required: ['productId', 'productName', 'price'],
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
        <h4>Basic Example</h4>
        <h5>Custom Node Container Header</h5>
        <QJsonTreeEditor
          v-model="data"
          :schema="jsonSchema"
          @updated="updated"
          class="q-ma-sm"
        >
          <template v-slot:containerHeader="scope">
            <q-item-section class="q-pa-sm">
              <q-item-label>{{ scope.schema.description }}</q-item-label>
              <q-item-label caption v-if="scope.modelValue.productName">{{
                scope.modelValue.productName
              }}</q-item-label>
              <q-btn
                v-if="scope.schema.items"
                label="Add"
                @click="scope.c.addItem()"
              />
            </q-item-section>
          </template>
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
  margin-left: 20px

.q-json-tree-node-division
  border: 0
  margin-bottom: 6px
  margin-left: 6px

.q-json-tree-node-card
  padding: 12px
  padding: 6px

.q-json-tree-field
  background-color: #eee
  margin: 6px
  margin: 6px

.q-json-tree-object
  border: 0
</style>
