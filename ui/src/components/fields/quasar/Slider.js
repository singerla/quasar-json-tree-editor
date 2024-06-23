import { h } from 'vue';
import { setupComponent, setupDefaults } from '../../index';
import { QSlider } from 'quasar';

export default {
  name: 'Slider',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    return () => [
      h(QSlider, {
        class: 'q-json-tree-field-slider',
        dense: true,
        label: c.getSchemaParam('label', false),
        min: c.getSchemaParam('min', 0),
        max: c.getSchemaParam('max', 100),
        modelValue: c.getData(),
        'onUpdate:modelValue': (val) => {
          emit('update:modelValue', val);
        },
      }),
    ];
  },
};
