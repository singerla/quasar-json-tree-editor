import { h } from 'vue';
import { setupComponent, setupDefaults, vd } from '../index';
import { QCheckbox, QInput } from 'quasar';
import ColorPicker from '../fields/quasar/ColorPicker';
import Slider from '../fields/quasar/Slider';

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
      boolean: QCheckbox,
      default: QInput,
    };

    if (useQuasarComponent) {
      const key = useQuasarComponent.toLowerCase();
      if (componentMap[key]) {
        return () => h(componentMap[key], c.props({}));
      } else {
        console.error(
          'Could not find specified quasar component: ' + useQuasarComponent
        );
      }
    }

    const addParams = {
      label: c.getLabel(),
    };
    let targetType = 'default';
    if (c.isBoolean()) {
      targetType = 'boolean';
    } else if (c.isNumeric()) {
      addParams.type = 'number';
    }

    const targetComponent = componentMap[targetType];

    return () => [
      h(
        targetComponent,
        c.props({
          class: 'q-json-tree-field',
          ...addParams,
        })
      ),
    ];
  },
};
