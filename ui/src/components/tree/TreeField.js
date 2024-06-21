import { h } from 'vue';
import { setupComponent, setupDefaults, vd } from '../index';
import { QInput } from 'quasar';
import ColorPicker from '../fields/quasar/ColorPicker';
import Slider from '../fields/quasar/Slider';

export default {
  name: 'QJsonTreeField',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    const useQuasarComponent = c.getSchemaParam('component');
    const quasarFieldMap = {
      colorpicker: ColorPicker,
      slider: Slider,
    };

    if (useQuasarComponent) {
      const key = useQuasarComponent.toLowerCase();
      if (quasarFieldMap[key]) {
        return () =>
          h(
            quasarFieldMap[key],
            c.props({
              initsUpdated: true,
            })
          );
      } else {
        console.error(
          'Could not find specified quasar component: ' + useQuasarComponent
        );
      }
    }

    return () => [
      h(
        QInput,
        c.props({
          label: c.getLabel(),
          class: 'q-json-tree-field',
          initsUpdated: true,
        })
      ),
    ];
  },
};
