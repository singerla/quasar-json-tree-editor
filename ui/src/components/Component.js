import { computed, h } from 'vue';
import QJsonTreeNode from './containers/QJsonTreeNode';
import { vd } from './index';

export default {
  name: 'QJsonTreeEditor',
  props: ['modelValue', 'schema', 'class'],
  emits: ['update:modelValue', 'updated'],

  setup(props, { emit }) {
    const localData = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
      },
    });
    const updated = (data) => {
      emit('updated', data);
    };

    return () => [
      h(QJsonTreeNode, {
        schema: props.schema,
        modelValue: localData.value,
        'onUpdate:modelValue': (value) => (localData.value = value),
        propKey: 'root',
        onUpdated: (data) => updated(data),
      }),
    ];
  },
};
