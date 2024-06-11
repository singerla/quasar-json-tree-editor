import { h } from "vue";
import { addItemByType, clearItemByType, setupDefaults, vd } from "./index";
import QJsonTreeNodeDivision from "./QJsonTreeNodeDivision";

export default {
  name: "QJsonTreeNode",
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const { localData, localSchema, parentSchema, propKey } =
      setupDefaults.local(props, emit);

    const updated = (data) => {
      data.path.push(props.propKey);
      emit("updated", data);
    };

    const addItem = addItemByType(localData, localSchema);
    const clearItem = clearItemByType(localData, localSchema);

    return () => [
      h(
        "div",
        {
          class: "q-json-tree-node",
        },
        h(QJsonTreeNodeDivision, {
          modelValue: localData.value,
          'onUpdate:modelValue': (value) => localData.value = value,
          propKey: props.propKey,
          schema: localSchema,
          parentSchema: parentSchema,
          onUpdated: updated,
          onAdd: addItem,
          onClear: clearItem,
          onDrop: emit("drop"),
        })
      ),
    ];
  },
};
