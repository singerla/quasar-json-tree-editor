import { h } from 'vue';
import { setupComponent, setupDefaults } from '../index';
import {QCheckbox, QInput, QToggle} from 'quasar';
import ColorPicker from '../fields/quasar/ColorPicker';
import Slider from '../fields/quasar/Slider';
import Select from "../fields/quasar/Select";

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
      default: QInput,
    };

    const addProps = {
      label: c.getLabel(),
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
    }

    const targetComponent = componentMap[targetType];

    return () => [
      h(
        targetComponent,
        c.props({
          class: 'q-json-tree-field',
          ...addProps,
        })
      ),
    ];
  },
};
