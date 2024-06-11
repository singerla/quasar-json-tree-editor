import {
  addItemToArray,
  clearItemByType,
  getPropertyKey,
  hasChildren,
  setupDefaults,
  vd,
} from "./index";
import { h } from "vue";
import QJsonTreeEditorField from "./QJsonTreeEditorField";
import { QItem, QItemSection } from "quasar";
import QJsonTreeNode from "./QJsonTreeNode";

export default {
  name: "QJsonTreeEditorArrayFixed",
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const { localData, localSchema, parentSchema, propKey, updated } =
      setupDefaults.local(props, emit);

    const children = [];

    for (const localDataFieldKey in Object.keys(localData.value)) {

      vd(localData.value)

      children.push(
        h(
          QItem,
          {
            key: "field_" + props.propKey + "_" + localDataFieldKey,
            class: "q-json-tree-list-item q-pa-none q-ma-none",
          },
          () =>
            h(QItemSection, {}, () =>
              h(QJsonTreeEditorField, {
                modelValue: localData.value[localDataFieldKey],
                'onUpdate:modelValue': (value) => localData.value[localDataFieldKey] = value,
                propKey: "field_" + localDataFieldKey,
                schema: localSchema.value.items,
                parentSchema: localSchema,
                onUpdated: updated,
                onDrop: () => localData.value.splice(localDataFieldKey, 1),
                onAdd: emit("add"),
                onClear: emit("clear"),
              })
            )
        )
      );
    }

    return () => children;
  },
};
