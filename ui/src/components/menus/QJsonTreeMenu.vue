<script setup>
import { toRef } from 'vue';
import ButtonDrop from '../buttons/ButtonDrop.vue';

const props = defineProps(['schema', 'parentSchema', 'propKey']);
const emits = defineEmits(['add', 'clear', 'drop']);
const localSchema = toRef(props, 'schema');

const drop = () => {
  emits('drop');
};
const clear = () => {
  emits('clear');
};
const add = () => {
  emits('add');
};
</script>

<template>
  <q-btn flat dense icon="more_vert">
    <q-menu>
      <q-list dense style="min-width: 100px">
        <q-item @click="add" clickable v-close-popup :disable="!parentSchema">
          <q-item-section avatar>
            <ButtonDrop icon="format_list_bulleted_add" />
          </q-item-section>
          <q-item-section> Append </q-item-section>
        </q-item>

        <q-item @click="clear" clickable :disable="!parentSchema" v-close-popup>
          <q-item-section avatar>
            <ButtonDrop icon="cancel" />
          </q-item-section>
          <q-item-section> Clear </q-item-section>
        </q-item>

        <q-item @click="drop" clickable v-close-popup>
          <q-item-section avatar>
            <ButtonDrop icon="delete" />
          </q-item-section>
          <q-item-section> Drop </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style scoped></style>
