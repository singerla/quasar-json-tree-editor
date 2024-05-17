<script setup>
defineEmits(['onAdd']);
</script>

<template>
  <q-item-section side>
    <q-btn
      icon="add"
      @click="$emit('onAdd')"
      size="sm"
      color="primary"
      class="q-mt-sm q-pa-sm"
      rounded
    />
  </q-item-section>
</template>
