<script setup>
import { computed } from 'vue';

const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);

const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value);
  },
});
</script>

<template>
  <q-input dense v-model="localData" class="my-input">
    <template v-slot:prepend>
      <div
        :style="'min-width: 20px; height: 20px; background-color: ' + localData"
      />
    </template>
    <template v-slot:append>
      <q-icon name="colorize" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-color v-model="localData" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<style scoped></style>
