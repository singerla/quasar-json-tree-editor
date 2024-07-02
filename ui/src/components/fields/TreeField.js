import { h } from 'vue';
import { setupComponent, setupDefaults } from '../index';
import { QInput, QToggle } from 'quasar';
import ColorPicker from './quasar/ColorPicker';
import Slider from './quasar/Slider';
import Select from './quasar/Select';

export default {
  name: 'QJsonTreeField',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    const useQuasarComponent = c.getSchemaParam('component');

    const componentMap = {
      colorpicker: ColorPicker,
      slider: Slider,
      select: Select,
      boolean: QToggle,
      number: QInput,
      default: QInput,
    };

    const addProps = {
      label: c.getSchemaParam('label', c.getLabel()),
    };

    if (useQuasarComponent) {
      const key = useQuasarComponent.toLowerCase();
      if (componentMap[key]) {
        return () => h(componentMap[key], c.props(addProps));
      } else {
        console.error(
          'Could not find specified quasar component: ' + useQuasarComponent
        );
      }
    }

    let targetType = 'default';
    if (c.isBoolean()) {
      targetType = 'boolean';
    } else if (c.isNumeric()) {
      addProps.type = 'number';
      targetType = 'number';
    }

    const targetComponent = componentMap[targetType];

    return () => [
      h(
        targetComponent,
        c.props({
          class: 'q-json-tree-field q-json-tree-field-' + targetType,
          hint: c.getSchema().description,
          ...addProps,
        })
      ),
    ];
  },
};
