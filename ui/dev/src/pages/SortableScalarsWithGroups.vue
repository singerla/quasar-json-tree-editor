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
    container: 'Card',
  },
  properties: {
    prop1: {
      type: 'array',
      params: {
        container: 'Expansion',
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
        container: 'Division',
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
    prop3: {
      description: 'A prop3 description',
      type: 'array',
      params: {
        container: 'Card',
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
  },
};

const data = reactive({
  prop1: [1, 2, 3],
  prop2: [4, 5, 6],
  prop3: [7, 8],
});

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
        <h4>Sortable scalars with groups</h4>
        <h5>
          See https://github.com/singerla/quasar-json-tree-editor/issues/3
        </h5>
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
.q-json-tree-header
  padding: 12px
  border-bottom: 1px solid maroon

.q-json-tree-list
  background-color: #eee

.q-json-tree-node-card
  margin-left: 6px
  padding: 0

.q-json-tree-node-expansion
  padding: 0
  margin: 0 0 0 6px
  border: 1px dotted green

.q-json-tree-node-division
  margin-left: 6px
  border: 3px dotted orange
</style>
