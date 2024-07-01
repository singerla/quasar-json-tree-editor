import { h } from 'vue';
import {setupComponent, setupDefaults, vd} from '../../index';
import {QSelect, QSlider} from 'quasar';

export default {
  name: 'Select',
  props: [...setupDefaults.props, 'label'],
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    return () => [
      h(QSelect, {
        class: 'q-json-tree-field-select',
        dense: true,
        label: c.getSchemaParam('label', c.getLabel()),
        options: c.getSchemaParam('options', []),
        optionLabel: c.getSchemaParam('optionLabel'),
        modelValue: c.getData(),
        'onUpdate:modelValue': (val) => {
          emit('update:modelValue', val);
        },
      }),
    ];
  },
};
