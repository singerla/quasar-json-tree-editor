<script setup>
defineProps(['icon', 'color']);
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
    :icon="icon"
    :color="color"
    @click="emits('drop')"
  />
</template>
