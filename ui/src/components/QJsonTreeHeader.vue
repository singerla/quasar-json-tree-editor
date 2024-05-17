<script setup>
defineProps(['schema', 'propKey']);
</script>

<template>
  <q-item class="q-pa-none full-width">
    <q-item-section avatar>
      <q-icon name="account_tree" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ schema.description }}
      </q-item-label>
      <q-item-label caption>
        {{ 'Key: ' + propKey }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
