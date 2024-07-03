<script setup>
import { reactive, ref } from 'vue';
import { vd } from '../../../src/components';

const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  title: 'Product',
  description: "A product from Acme's catalog",
  type: 'object',
  params: {},
  properties: {
    prop1: {
      type: 'array',
      params: {
        sortable: true,
        showAddButton: true,
        group: {
          name: 'numbers',
        },
      },
      items: {
        type: 'number',
      },
    },
    prop2: {
      type: 'array',
      params: {
        sortable: true,
        group: {
          name: 'numbers',
        },
      },
      items: {
        type: 'number',
      },
    },
    prop3: {
      type: 'array',
      params: {
        sortable: true,
        group: {
          name: 'numbers2',
        },
      },
      items: {
        type: 'number',
      },
    },
  },
};

const data = reactive({
  prop1: [1, 2, 3],
  prop2: [4, 5, 6],
  prop3: [7, 8],
});

const updated = (tmp) => {
  vd('updated root');
  vd(tmp);
  vd(data);
};

const sep1 = ref(70);
</script>

<template>
  <q-page padding class="">
    <q-splitter class="" v-model="sep1" vertical>
      <template v-slot:before>
        <h4>Sortable Example</h4>
        <QJsonTreeEditor
          v-model="data"
          :schema="jsonSchema"
          @updated="updated"
        />
        <q-separator></q-separator>
      </template>
      <template v-slot:after>
        <pre>{{ data }}</pre>
      </template>
    </q-splitter>
  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
