import {
  computedLocalData,
  isArray,
  isObject,
  isScalar,
  setupDefaults,
  vd,
} from "./index";
import { h, toRef } from "vue";
import QJsonTreeEditorField from "./QJsonTreeEditorField";
import QJsonTreeEditorObject from "./QJsonTreeEditorObject";
import QJsonTreeEditorArray from "./QJsonTreeEditorArray";

export default {
  name: "QJsonTreeElement",
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const localData = computedLocalData(props, emit);
    const localSchema = toRef(props, "schema");
    const updated = (data) => {
      emit("updated", data);
    };

    const children = [];
    if (isScalar(localSchema.value).value) {
      vd('Element is scalar')
      children.push(
        h(QJsonTreeEditorField, {
          modelValue: localData.value,
          'onUpdate:modelValue': (value) => localData.value = value,
          propKey: props.propKey,
          schema: localSchema,
          onUpdated: updated,
        })
      );
    } else if (isObject(localSchema.value).value) {
      vd('Element is isObject')
      children.push(
        h(QJsonTreeEditorObject, {
          modelValue: localData.value,
          'onUpdate:modelValue': (value) => localData.value = value,
          propKey: props.propKey,
          schema: localSchema,
          onUpdated: updated,
        })
      );
    } else if (isArray(localSchema.value).value) {
      vd('Element is isArray')
      children.push(
        h(QJsonTreeEditorArray, {
          modelValue: localData.value,
          'onUpdate:modelValue': (value) => localData.value = value,
          propKey: props.propKey,
          schema: localSchema,
          onUpdated: updated,
        })
      );
    }

    return () => children;
  },
};
