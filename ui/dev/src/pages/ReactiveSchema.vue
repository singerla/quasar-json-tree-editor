<script setup>
import { reactive, ref } from 'vue';
import { vd } from '../../../src/components';

const users = reactive({
  list: [
    {
      id: 1,
      name: 'Test user 1',
    },
    {
      id: 2,
      name: 'Test user 2',
    },
  ],
});

const data = reactive({
  productOwner: users.list[0],
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
    productOwner: {
      description: 'Owner of the product (object)',
      type: 'object',
      params: {
        component: 'select',
        label: 'Test Select Label',
        optionLabel: 'name',
        options: users.list,
      },
    },
  },
};

const jsonUsers = {
  title: 'Users',
  type: 'object',
  properties: {
    list: {
      type: 'array',
      params: {
        container: 'Expansion',
        sortable: true,
      },
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          name: {
            description: 'Owner of the product (string)',
            type: 'string',
          },
        },
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
        <h4>Reactive Schema</h4>
        <h5>Define Users</h5>
        <QJsonTreeEditor
          v-model="users"
          :schema="jsonUsers"
          @updated="updated"
          class="q-ma-sm"
        />

        <h5>Use reactive users</h5>
        <QJsonTreeEditor
          v-model="data"
          :schema="jsonSchema"
          @updated="updated"
          class="q-ma-sm"
        />
      </template>
      <template v-slot:after>
        Users:
        <pre>{{ users }}</pre>
        Data:
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
