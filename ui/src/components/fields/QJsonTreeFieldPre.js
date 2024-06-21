import { h } from 'vue';
import { setupComponent, setupDefaults, vd } from '../index';
import { QInput } from 'quasar';
import ColorPicker from './quasar/ColorPicker';

export default {
  name: 'QJsonTreeFieldPre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    const useQuasarComponent = c.getSchemaParam('component');
    const quasarFieldMap = {
      colorpicker: ColorPicker,
    };

    const doUpdate = (val) => {
      emit('updated', {
        path: [],
        oldValue: c.getData(),
        newValue: val,
      });
      emit('update:modelValue', val);
    };

    if (useQuasarComponent) {
      const key = useQuasarComponent.toLowerCase();
      if (quasarFieldMap[key]) {
        return () => h(quasarFieldMap[key], {
          ...c.hProps(),
          'onUpdate:modelValue': doUpdate,
        });
      } else {
        console.error(
          'Could not find specified quasar component: ' + useQuasarComponent
        );
      }
    }

    return () => [
      h(QInput, {
        label: c.getLabel(),
        class: 'q-json-tree-field',
        dense: true,
        modelValue: c.getData(),
        'onUpdate:modelValue': doUpdate,
      }),
    ];
  },
};
