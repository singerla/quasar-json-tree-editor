import {
  clearItemByType,
  computedLocalData,
  isArray,
  isObject,
  setupDefaults,
  setupComponent,
  valueBySchema,
  vd,
} from '../index';
import { h } from 'vue';
import { QCheckbox, QInput } from 'quasar';
import QJsonTreeEditorObject from '../lists/QJsonTreeEditorObject';
import QJsonTreeEditorArray from '../lists/QJsonTreeEditorArray';

export default {
  name: 'QJsonTreeEditorField',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const component = setupComponent(
      props,
      emit,
      (value, localSchema, propKey) => {
        const newValue = valueBySchema(value, localSchema.value);
        const oldValue = props.modelValue;
        emit('updated', {
          propKey: propKey.value,
          newValue,
          oldValue,
          path: [],
        });
        return value;
      }
    );

    const hProps = component.hProps({
      clear: clearItemByType,
    });

    const mapComponents = {
      object: QJsonTreeEditorObject,
      array: QJsonTreeEditorArray,
      boolean: QCheckbox,
      numeric: QInput,
      scalar: QInput,
      default: QInput,
    };
    const mapType = component.mapType();

    if (mapType === 'numeric') {
      hProps.type = 'number';
    }
    if (component.is('scalar')) {
      hProps.label = component.propKey.value;
    }

    const targetComponent = mapComponents[mapType];
    return () => h(targetComponent, hProps);
  },
};
