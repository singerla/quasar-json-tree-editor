<script setup>
import { reactive, ref } from 'vue';
import { vd } from '../../../src/components';

const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  title: 'Product',
  description: "A product from Acme's catalog",
  type: 'object',
  properties: {
    // prop2: {
    //   type: 'array',
    //   params: {
    //     sortable: true,
    //   },
    //   items: {
    //     type: 'number',
    //   },
    // },
    // slider: {
    //   type: 'array',
    //   items: {
    //     type: 'number',
    //     component: 'Slider',
    //     params: {
    //       min: 0,
    //       max: 100,
    //     },
    //   },
    // },
    arrayOfArrays: {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    // objectsArray: {
    //   type: 'array',
    //   params: {
    //     sortable: true,
    //   },
    //   items: {
    //     type: 'object',
    //     properties: {
    //       key: {
    //         type: 'string',
    //       },
    //       active: {
    //         type: 'boolean',
    //       },
    //       background: {
    //         type: 'object',
    //         properties: {
    //           color: {
    //             type: 'string',
    //             component: 'ColorPicker',
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
  },
};

const data = reactive({
  arrayOfArrays: [['123'], ['abv', 'sdfdf']],
  // prop2: [3, 4, 5],
  // slider: [30],
  // objectsArray: [
  //   {
  //     key: 'Key 1',
  //     active: false,
  //   },
  //   {
  //     key: 'Key 2',
  //     active: true,
  //     background: {
  //       color: '#cccccc',
  //     },
  //   },
  // ],
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
        <h4>Quasar components Example</h4>
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

<style lang="sass" scoped></style>
