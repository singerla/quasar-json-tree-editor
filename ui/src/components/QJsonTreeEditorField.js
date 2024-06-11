import {
  clearItemByType,
  computedLocalData,
  setupDefaults,
  valueBySchema,
} from "./index";
import { h, toRef } from "vue";
import { QInput } from "quasar";

export default {
  name: "QJsonTreeEditorField",
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const { localSchema, parentSchema, propKey } = setupDefaults.local(
      props,
      emit
    );

    const localData = computedLocalData(props, emit, (value) => {
      value = valueBySchema(value, localSchema.value);
      initUpdated(value, props.modelValue);
      return value;
    });

    const initUpdated = (newValue, oldValue) => {
      emit("updated", {
        propKey: propKey.value,
        newValue,
        oldValue,
        path: [],
      });
    };

    const updated = (data) => {
      emit("updated", data);
    };
    const add = () => {
      emit("add");
    };
    const drop = () => {
      emit("drop");
    };
    const clear = clearItemByType(localData, localSchema);
    return () => [
      h(QInput, {
        label: propKey.value,
        modelValue: localData.value,
        'onUpdate:modelValue': (value) => localData.value = value,
      }),
    ];
  },
};
