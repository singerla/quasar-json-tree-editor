<script setup>
import {ref, toRef, watch} from "vue";
import QJsonTreeEditorField from "./QJsonTreeEditorField.vue";

const props = defineProps({
  data: {
    default: () => null,
  },
  schema: {
    type: Object,
    default: () => {},
  },
  // This is useful if no description was sent
  propKey: {
    type: String,
    default: () => "unknown",
  },
});

const localSchema = toRef(props, "schema");
const localData = toRef(props, "data");

const getPropertyKey = (index) =>
  Object.keys(localSchema.value.properties)[index];

// Expanded by default for all nodes
const expansionItemState = ref(true);

// This emit is required to update a single property value
const emits = defineEmits(['updated'])
watch(localData, (localData) => {
  emits('updated', localData)
})

// To add an item, it's enough to push localData ref
const addItem = () => {
  localData.value.push("");
};
</script>

<!-- QJsonTreeEditorNode.vue -->
<template>
  <q-expansion-item
      dense
    style="border: 1px solid #ccc"
    header-style="background-color: #ddd;"
    v-model="expansionItemState"
  >
    <template v-slot:header>
      <q-item class="q-pa-none full-width">
        <q-item-section avatar>
          <q-icon name="account_tree" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ localSchema.description || "Key: " + propKey }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <q-item v-if="!localSchema.properties">
      <q-item-section>
        <QJsonTreeEditorField
          v-if="localSchema.type !== 'array'"
          :data="localData"
          @updated="(newValue) => emits('updated', newValue)"
          :schema="localSchema"
        />
        <div v-else>
          <QJsonTreeEditorField
            v-for="(localDataField, localDataFieldKey) in localData"
            :key="'field_' + localDataFieldKey"
            :data="localDataField"
            @updated="(newValue) => (localData[localDataFieldKey] = newValue)"
            :schema="localSchema.items"
          />
          <q-item-section side>
            <q-btn
              icon="add"
              @click="addItem"
              size="sm"
              color="primary"
              class="q-mt-sm q-pa-sm"
              rounded
            />
          </q-item-section>
        </div>
      </q-item-section>
      <q-item-section avatar>
        <q-chip :label="localSchema.type" />
      </q-item-section>
    </q-item>

    <q-item class="q-pl-sm" v-else>
      <q-item-section>
        <!--        <draggable>-->
        <div
          v-for="(property, index) in Object.values(localSchema.properties)"
          :key="'prop_' + index"
        >
          <QJsonTreeEditorNode
            :schema="property"
            :data="localData[getPropertyKey(index)]"
            :propKey="getPropertyKey(index)"
            @updated="(newValue) => localData[getPropertyKey(index)] = newValue"
          />
        </div>
        <!--        </draggable>-->
      </q-item-section>
    </q-item>
  </q-expansion-item>
</template>

<style scoped></style>
