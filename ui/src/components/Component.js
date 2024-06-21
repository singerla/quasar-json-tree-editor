import {h} from 'vue';
import QJsonTreeNodePre from './containers/QJsonTreeNodePre';
import {vd} from "./index";

export default {
  name: 'QJsonTreeEditor',
  props: ['modelValue', 'schema', 'class'],
  emits: ['update:modelValue', 'updated'],

  setup(props, { emit }) {
    return () => [
      h(QJsonTreeNodePre, {
        schema: props.schema,
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => {
          emit('update:modelValue', value);
        },
        propKey: 'root',
        onUpdated: (data) => emit('updated', data),
      }),
    ];
  },
};
