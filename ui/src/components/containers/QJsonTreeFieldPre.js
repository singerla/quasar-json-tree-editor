import { h, toRef, watch } from 'vue';
import { setupComponent, setupDefaults, vd } from '../index';
import QJsonTreeNodeDivision from './QJsonTreeNodeDivision';
import QJsonTreeNodeCard from './QJsonTreeNodeCard';
import QJsonTreeNodeExpansion from './QJsonTreeNodeExpansion';
import { QInput } from 'quasar';

export default {
  name: 'QJsonTreeFieldPre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    vd('setup QJsonTreeFieldPre');
    // vd(props.schema);

    return () =>
      h(QInput, {
        modelValue: props.modelValue,
        label: props.type,
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
