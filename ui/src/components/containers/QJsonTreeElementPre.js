import { h } from 'vue';
import { setupComponent, setupDefaults } from '../index';
import QJsonTreeField from '../fields/QJsonTreeField';
import QJsonTreeNode from './QJsonTreeNodePre';
import QJsonTreeArray from '../containter/QJsonTreeArrayPre';

export default {
  name: 'QJsonTreeElementPre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    if (c.hasProperties()) {
      return () => h(QJsonTreeNode, c.hPropParams('property'));
    } else if (c.isArray()) {
      return () => h(QJsonTreeArray, c.hSortableParams());
    } else {
      return () => h(QJsonTreeField, c.hScalarParams('scalar'));
    }
  },
};
