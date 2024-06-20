import { h } from 'vue';
import { setupDefaults } from '../index';
import { QInput } from 'quasar';

export default {
  name: 'QJsonTreeFieldPre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    return () =>
      h(QInput, {
        modelValue: props.modelValue,
        label: props.propKey + ' (' + props.type +')',
        'onUpdate:modelValue': (val) => {
          emit('updated', {
            path: [],
            oldValue: props.modelValue,
            newValue: val,
          });
          emit('update:modelValue', val);
        },
      });
  },
};
