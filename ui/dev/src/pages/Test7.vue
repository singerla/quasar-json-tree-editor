<script setup>
import { reactive, ref } from 'vue';
import { vd } from '../../../src/components';

const data = reactive({
  productId: 1,
  // productName: 'An ice sculpture',
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
  },
};

const updated = (tmp) => {
  vd('updated root');
  // vd(tmp);
  // vd(data);
};
const sep1 = ref(70);
</script>

<template>
  <q-page padding class="">
    <q-splitter v-model="sep1" vertical>
      <template v-slot:before>
        <h4>Basic Example 7</h4>
        <QJsonTreeEditor
          v-model="data"
          :schema="jsonSchema"
          @updated="updated"
          class="q-ma-sm"
        >
          <template v-slot:addObjectPropertyButton="scope" v-bind="data">
            <q-btn
              size="lg"
              color="orange"
              :label="'add custom ' + scope.label"
              @click="scope.onClick"
            />
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
  margin-left: 16px

.q-json-tree-node-division
  border: 0
  margin-bottom: 6px
  margin-left: 6px

.q-json-tree-field
  background-color: #eee
  border: 0

.q-json-tree-object
  border: 0
</style>
