<script setup>
const emits = defineEmits(['drop']);
</script>

<template>
  <q-btn
    class=""
    flat
    size="md"
    rounded
    dense
    no-caps
    icon="delete"
    color="primary"
    @click="emits('drop')"
  />
</template>
