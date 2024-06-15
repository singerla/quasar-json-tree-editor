<script setup>
defineProps(['schema', 'propKey', 'showType', 'showKey']);
</script>

<template>
  <q-item class="q-json-tree-header full-width q-pa-none q-ma-none">
    <q-item-section v-if="$slots.icon" avatar>
      <slot name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label v-if="schema.description">
        {{ schema.description }}
      </q-item-label>
      <q-item-label caption v-if="!schema.description || showKey">
        {{ propKey }}
      </q-item-label>
    </q-item-section>
    <q-item-section side v-if="showType">
      <q-chip :label="schema.type" color="grey-2" />
    </q-item-section>
    <q-item-section side v-if="showType">
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
