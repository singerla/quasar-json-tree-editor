import { addItemToArray, setupDefaults } from "./index";
import { h } from "vue";
import QJsonTreeEditorArrayFixed from "./QJsonTreeEditorArrayFixed";

export default {
  name: "QJsonTreeEditorArray",
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const { localData, localSchema, parentSchema, propKey, updated } =
      setupDefaults.local(props, emit);

    const addItem = addItemToArray(localData, localSchema);
    const clear = () => (localData.value = []);
    const drop = (index) => localData.value.splice(index, 1);

    return () =>
      h(QJsonTreeEditorArrayFixed, {
        modelValue: localData.value,
        'onUpdate:modelValue': (value) => localData.value = value,
        schema: localSchema.value,
        propKey: propKey.value,
        onUpdated: updated,
      });
  },
};
