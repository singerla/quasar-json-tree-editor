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
        {{ propKey }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-chip :label="schema.type" color="grey-2" />
    </q-item-section>
    <q-item-section side>
      <q-chip
        v-if="schema.items?.type"
        :label="'of ' + schema.items.type + 's'"
        color="grey-6"
      />
    </q-item-section>
  </q-item>
</template>
