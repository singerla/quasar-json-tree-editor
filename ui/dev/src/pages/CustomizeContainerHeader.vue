<script setup>
import { reactive, ref, watch } from 'vue';
import { vd } from '../../../src/components';

const users = ref([
  {
    id: 1,
    name: 'Test user 1',
  },
  {
    id: 2,
    name: 'Test user 2',
  },
]);

const jsonUsers = {
  type: 'array',
  description: 'This is the customized root container header.',
  params: {
    container: 'expansion',
    sortable: true,
    header: {
      sections: ['menu', 'space', 'label', 'info', 'icon'],
      icon: { name: 'data_object' },
    },
  },
  items: {
    type: 'object',
    params: {
      header: {
        sections: ['menu', 'space', 'icon'],
        icon: { name: 'data_object' },
      },
    },
    properties: {
      id: {
        title: 'ID',
        type: 'number',
        params: {
          label: 'Test',
        },
      },
      name: {
        title: 'Name',
        description: 'Owner of the product (string)',
        type: 'string',
      },
    },
  },
};

const strings = ref([]);
const jsonStrings = {
  type: 'array',
  params: {
    container: 'Divison',
  },
  items: {
    type: 'string',
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
        <h4>Array on root level</h4>
        <h5>Define Users</h5>
        <pre>Use ref() instead of reactive()</pre>
        <QJsonTreeEditor
          v-model="users"
          :schema="jsonUsers"
          @updated="updated"
          class="q-ma-sm"
        />
        <h5>Define Scalars</h5>
        <QJsonTreeEditor
          v-model="strings"
          :schema="jsonStrings"
          @updated="updated"
          class="q-ma-sm"
        />
      </template>
      <template v-slot:after>
        Users:
        <pre>{{ users }}</pre>
        Strings:
        <pre>{{ strings }}</pre>
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
  padding: 6px
  margin: 20px

.q-json-tree-field-number
  border: 1px dotted grey

.q-json-tree-field-select
  background-color: #ddd
  border: 0
  padding: 12px

.q-json-tree-object
  border: 0
</style>
