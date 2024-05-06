<script setup>
import { toRef } from "vue";

const props = defineProps({
  data: {
    default: () => null,
  },
  schema: {
    type: Object,
    default: () => {},
  },
});

// props.data is not writeable, so we emit the new value on update
const emits = defineEmits(['updated'])

const localSchema = toRef(props, "schema");
const localData = toRef(props, "data");

const update = (newValue) => {
  emits('updated', newValue)
}

</script>

<template>
  <q-input :modelValue="localData" @update:modelValue="update" v-if="localSchema.type === 'string'" />
  <q-input
    :modelValue="localData"
    @update:modelValue="update"
    v-if="localSchema.type === 'number'"
    type="number"
  />
  <q-input
    :modelValue="localData"
    @update:modelValue="update"
    v-if="localSchema.type === 'integer'"
    type="number"
  />
</template>

<style scoped></style>
