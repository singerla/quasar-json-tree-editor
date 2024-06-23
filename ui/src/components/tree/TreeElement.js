import { h } from 'vue';
import { setupComponent, setupDefaults } from '../index';
import TreeField from './TreeField';
import TreeNode from './TreeNodeContainer';

export default {
  name: 'TreeElement',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    if (c.hasProperties() || c.isArray()) {
      return () => h(TreeNode, c.props({}));
    } else {
      return () => h(TreeField, c.props({}));
    }
  },
};
