<script setup>
import { computed, reactive } from 'vue';
import { vd } from '../../../src/components';

const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  title: 'Product',
  description: "A product from Acme's catalog",
  type: 'object',
  properties: {
    productId: {
      description: 'The unique identifier for a product',
      type: 'integer',
    },
    dimensions: {
      type: 'object',
      properties: {
        length: {
          type: 'number',
        },
        nestedObject: {
          description: 'Nested items for the product',
          type: 'object',
          properties: {
            prop1: {
              type: 'string',
            },
            prop2: {
              type: 'array',
              items: {
                type: 'number',
              },
            },
            objectsArray: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  key: {
                    type: 'string',
                  },
                  value: {
                    type: 'string',
                  },
                  objValue: {
                    type: 'object',
                    properties: {
                      nestedKey: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      required: ['length'],
    },
  },
  required: ['productId'],
};

const data = reactive({
  // productId: 1,
  dimensions: {
    length: 7.0,
    nestedObject: {
      prop1: 'test',
      // prop2: [3, 4, 5],
      objectsArray: [
        {
          key: 'Key 1',
          value: 'Value 1',
        },
        {
          key: 'Key 2',
          value: 'Value 2',
        },
      ],
    },
  },
});

const updated = (tmp) => {
  vd('updated root');
  vd(tmp);
};
</script>

<template>
  <q-page padding>
    <QJsonTreeEditor v-model="data" :schema="jsonSchema" @updated="updated" />
  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
