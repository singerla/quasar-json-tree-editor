<script setup>
defineProps(['schema', 'propKey']);
</script>

<template>
  <q-item class="q-json-tree-header q-pa-none full-width">
    <q-item-section v-if="$slots.icon" avatar>
      <slot name="icon" />
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
    <q-item-section v-if="$slots.menu" avatar>
      <slot name="menu" />
    </q-item-section>
  </q-item>
</template>
