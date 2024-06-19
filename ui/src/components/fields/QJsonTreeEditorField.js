import { setupComponent, setupDefaults, valueBySchema } from '../index';
import { h } from 'vue';
import { QCheckbox, QInput, QItem, QItemSection } from 'quasar';
import QJsonTreeEditorObject from '../lists/QJsonTreeEditorObject';
import QJsonTreeEditorArray from '../lists/QJsonTreeEditorArray';
import QJsonTreeMenu from '../menus/QJsonTreeMenu';

export default {
  name: 'QJsonTreeEditorField',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const component = setupComponent(
      props,
      emit,
      'QJsonTreeEditorField',
      (value, localSchema, propKey) => {
        const newValue = valueBySchema(value, localSchema.value);
        const oldValue = props.modelValue;
        emit('updated', {
          propKey: propKey.value,
          newValue,
          oldValue,
          path: [],
        });
        return newValue;
      }
    );

    const hProps = component.hProps({});

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
      // hProps.label = component.propKey.value;
    }

    // vd(hProps.modelValue)

    const targetComponent = mapComponents[mapType] || mapComponents.default;
    return () =>
      h(QItem, () => [
        h(QItemSection, () => h(targetComponent, hProps)),
        h(QItemSection, { side: true }, () => h(QJsonTreeMenu, hProps)),
      ]);
  },
};
