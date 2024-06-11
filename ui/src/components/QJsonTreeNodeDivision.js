import { computedLocalData, setupDefaults, vd } from "./index";
import { h, toRef } from "vue";
import QJsonTreeElement from "./QJsonTreeElement";

export default {
  name: "QJsonTreeNodeDivision",
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const localData = computedLocalData(props, emit);
    const localSchema = toRef(props, "schema");
    const updated = (data) => {
      emit("updated", data);
    };

    return () => [
      h(
        "div",
        {
          class: "q-json-tree-node-division",
        },
        h(QJsonTreeElement, {
          modelValue: localData.value,
          'onUpdate:modelValue': (value) => localData.value = value,
          propKey: props.propKey,
          schema: localSchema,
          onUpdated: updated,
        })
      ),
    ];
  },
};
