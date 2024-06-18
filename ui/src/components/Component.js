import { computed, h } from 'vue';
import QJsonTreeNode from './containers/QJsonTreeNode';
import { vd } from './index';

export default {
  name: 'QJsonTreeEditor',
  props: ['modelValue', 'schema', 'class'],
  emits: ['update:modelValue', 'updated'],

  setup(props, { emit }) {
    return () => [
      h(QJsonTreeNode, {
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