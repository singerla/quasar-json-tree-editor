import { h, provide } from 'vue';
import TreeNode from './tree/TreeNodeContainer';
import { vd } from './index';

export default {
  name: 'QJsonTreeEditor',
  props: ['modelValue', 'schema', 'class'],
  emits: ['update:modelValue', 'updated'],

  setup(props, { emit, slots }) {
    if (slots.addObjectPropertyButton) {
      provide('addObjectPropertyButton', slots.addObjectPropertyButton);
    }
    if (slots.addItemToArrayButton) {
      provide('addItemToArrayButton', slots.addItemToArrayButton);
    }
    if (slots.containerHeader) {
      provide('containerHeader', slots.containerHeader);
    }

    return () => [
      h(TreeNode, {
        schema: props.schema,
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => {
          emit('update:modelValue', value);
        },
        propKey: 'root',
        path: ['root'],
        onUpdated: (data) => emit('updated', data),
      }),
    ];
  },
};
