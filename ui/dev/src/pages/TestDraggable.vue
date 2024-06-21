<script setup>
import { ref } from 'vue';
import { vd } from '../../../src/components';
import { useDraggable } from 'vue-draggable-plus';

const el1 = ref(null);
const el2 = ref(null);

const data1 = ref([
  {
    id: 13,
    productName: 'Test 1-3',
  },
  {
    id: 12,
    productName: 'Test 1-2',
  },
  {
    id: 11,
    productName: 'Test 1-1',
  },
]);

const data2 = ref([
  {
    id: 23,
    productName: 'Test 2-3',
  },
  {
    id: 22,
    productName: 'Test 2-2',
  },
  {
    id: 31,
    productName: 'Test 3-1',
  },
]);

const updated = (tmp) => {
  vd('updated root');
  vd(tmp);
  // vd(data);
};
const draggable = useDraggable(el1, data1, {
  animation: 150,
  group: {
    name: "group1"
  },
  onStart() {
    console.log('start');
  },
  onUpdate() {
    console.log('update');
  },
});

const draggable2 = useDraggable(el2, data2, {
  animation: 150,
  group: {
    name: "group1"
  },
  onStart() {
    console.log('start');
  },
  onUpdate() {
    console.log('update');
  },
});
const sep1 = ref(70);
</script>

<template>
  <q-page padding class="">
    <q-splitter v-model="sep1" vertical>
      <template v-slot:before>
        <h4>Sortable objects 1</h4>
        <ul ref="el1">
          <li v-for="item in data1" :key="item.id">
            {{ item.productName }}
          </li>
        </ul>
        <h4>Sortable objects 2</h4>
        <ul ref="el2">
          <li v-for="item in data2" :key="item.id">
            {{ item.productName }}
          </li>
        </ul>
      </template>
      <template v-slot:after>
        <pre>{{ data1 }}</pre>
        <pre>{{ data2 }}</pre>
      </template>
    </q-splitter>
  </q-page>
</template>

<style lang="sass">
.q-json-tree-node
  margin-left: 8px

.q-json-tree-header
  padding: 12px
  border-bottom: 1px solid maroon

.q-json-tree-list
  background-color: #eee

.q-json-tree-list-item
  border-bottom: 1px solid #eeeeee

.q-json-tree-node-card
  margin-left: 6px
  padding: 0

.q-json-tree-node-expansion
  padding: 0
  margin: 0 6px 6px 6px
  border: 0px dotted green

.q-json-tree-node-division
  padding: 0
  margin: 0 6px 6px 6px
  border: 0px dotted orange

.q-json-tree-field
  padding: 6px
  margin: 6px
  background-color: #eee
  border: 0
</style>
