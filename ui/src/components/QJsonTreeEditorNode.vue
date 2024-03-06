<script setup>
import { toRefs, ref, watchEffect, toRef } from "vue";
import draggable from "vuedraggable";

const props = defineProps({
  data: {
    type: Object,
    default: () => { },
  },
  label: {
    type: String,
    required: true
  },
});

let internalData = toRef()

watchEffect(() => {
  internalData = props.data

  if (internalData?.newItemSettings) {
    let newElement = internalData.newItemSettings
    let flag = 1

    if (newElement.type === "array") {
      internalData[newElement.value] = [{ type: "New", newElement: true }]
    } else if (newElement.type === "object") {
      internalData[newElement.value] = {
        newItemSettings: {
          value: "NewItem",
          type: ""
        }
      }
    } else if (newElement.type === "string") {
      internalData[newElement.value] = ""
    } else if (newElement.type === "number") {
      internalData[newElement.value] = 0
    } else {
      flag = 0
    }

    if (flag) delete internalData.newItemSettings
  }

  for (let key in internalData) {
    if (typeof internalData[key] === "object" && internalData[key].length > 0) {
      for (let i = 0; i < internalData[key].length; i++) {
        const element = internalData[key][i]

        if (element?.newElement) {
          if (element.type === "array") {
            internalData[key][i] = [{ type: "New", newElement: true }]
          } else if (element.type === "object") {
            internalData[key][i] = {
              newItemSettings: {
                value: "NewItem",
                type: ""
              }
            }
          } else if (element.type === "string") {
            internalData[key][i] = ""
          } else if (element.type === "number") {
            internalData[key][i] = 0
          }
        }
      }
    }
  }
})

const addChildAfter = (key, index) => {
  internalData[key].splice(index + 1, 0, { type: "New", newElement: true });
};

const addChildBefore = (key, index) => {
  internalData[key].splice(index, 0, { type: "New", newElement: true });
};

const deleteChild = (key, index) => {
  internalData[key].splice(index, 1);
};

const addItem = () => {
  internalData.newItemSettings = {
    value: "NewItem",
    type: ""
  }
}

const deleteItem = (key) => {
  delete internalData[key];
}
</script>

<!-- QJsonTreeEditorNode.vue -->
<template>
  <q-expansion-item :label="props.label" style="border: 1px solid #CCC;">
    <q-expansion-item-section>
      <div class="q-pl-sm">
        <q-item v-for="(value, key, index) in internalData" :key="index" style="border: 1px solid #CCC; margin: 5px;">
          <q-item-section style="border: 1px dotted #CCC; padding: 10px;">
            <q-input v-model="internalData[key]" :label="key" v-if="(typeof internalData[key] !== 'object')" />
            <q-list class="q-pl-sm" v-if="typeof internalData[key] === 'object' && internalData[key]?.length > 0">
              <q-item v-for="(item, index) in internalData[key]" :key="index">
                <q-item-section>
                  <QJsonTreeEditorNode :data="item" :label="key" v-if="(typeof item === 'object')" />
                  <q-input v-model="internalData[key][index]" :label="typeof item" v-else />
                </q-item-section>
                <q-item-section side>
                  <div style="{display: flex}">
                    <q-btn label="|+" @click="addChildBefore(key, index)" color="positive" />
                    <q-btn label="+|" @click="addChildAfter(key, index)" color="positive" />
                    <q-btn label="-" @click="deleteChild(key, index)" color="negative" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
            <QJsonTreeEditorNode :data="value" :label="key" v-else-if="typeof internalData[key] === 'object'" />
          </q-item-section>
          <q-item-section side>
            <div style="{display: flex}">
              <q-btn label="+" @click="addItem" color="positive" />
              <q-btn label="-" @click="deleteItem(key)" color="negative" />
            </div>
          </q-item-section>
        </q-item>
      </div>
    </q-expansion-item-section>
  </q-expansion-item>
</template>

<style scoped></style>
