import { h } from 'vue';
import { setupComponent, setupDefaults } from '../index';
import TreeField from './TreeField';
import TreeNode from './TreeNode';
import ArrayItems from '../containers/items/ArrayItems';

export default {
  name: 'TreeElement',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    if (c.hasProperties()) {
      return () =>
        h(
          TreeNode,
          c.props({
            type: 'property',
          })
        );
    } else if (c.isArray()) {
      return () =>
        h(
          ArrayItems,
          c.props({
            type: 'items',
          })
        );
    } else {
      return () =>
        h(
          TreeField,
          c.props({
            type: 'scalar',
          })
        );
    }
  },
};
