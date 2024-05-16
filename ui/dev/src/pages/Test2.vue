<script setup>
import { reactive } from 'vue';
import { vd } from '../../../src/components';

const data = reactive({
  productId: 1,
  dimensions: {
    length: 7.0,
    nestedObject: {
      prop1: 'test',
      prop2: [3, 4, 5],
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

const onUpdated = () => {
  vd('was updated');
};
</script>

<template>
  <q-page padding>
    <QJsonTreeEditor :data="data" :schema="jsonSchema" @updated="onUpdated" />
  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
