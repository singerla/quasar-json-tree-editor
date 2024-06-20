import { h } from 'vue';
import {setupComponent, setupDefaults} from '../index';
import { QInput } from 'quasar';

export default {
  name: 'QJsonTreeFieldPre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);
    return () =>
      h(QInput, {
        modelValue: c.getData(),
        label: c.getLabel(),
        class: 'q-json-tree-field',
        'onUpdate:modelValue': (val) => {
          emit('updated', {
            path: [],
            oldValue: c.getData(),
            newValue: val,
          });
          emit('update:modelValue', val);
        },
      });
  },
};
