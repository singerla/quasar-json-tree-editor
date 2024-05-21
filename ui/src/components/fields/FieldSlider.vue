<script setup>
import { computed, toRef } from 'vue';

const props = defineProps(['modelValue', 'schema', 'propKey']);
const emits = defineEmits(['update:modelValue']);
const localSchema = toRef(props, 'schema');
const localPropKey = toRef(props, 'propKey');
const localData = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value);
  },
});
</script>

<template>
  <q-slider
    :min="localSchema.params.min"
    :max="localSchema.params.max"
    dense
    v-model="localData"
    class="my-input"
  >
  </q-slider>
</template>

<style scoped></style>
