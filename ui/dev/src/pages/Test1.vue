<script setup >
import { reactive } from "vue";

const data = reactive([
  {
    value: "test 1",
    children: [
      {
        value: "test2",
        children: [
          {
            value: "test3",
            component: 'textfield'
          },
        ],
      },
    ],
  },
]);
</script>

<template>
  <q-page padding>
    <QJsonTreeEditor :data="data" />
  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
