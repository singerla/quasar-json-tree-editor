<script setup >
import { reactive } from "vue";

const data = reactive({
  productId: 1,
  productName: "An ice sculpture",
  price: 12.5,
  tags: ["cold", "ice"],
  dimensions: {
    length: 7.0,
    width: 12.0,
    height: 9.5,
    tags: ["nested", "cold", "ice"],
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
</script>

<template>
  <q-page padding>
    <QJsonTreeEditor :data="data" :schema="jsonSchema"/>
  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
