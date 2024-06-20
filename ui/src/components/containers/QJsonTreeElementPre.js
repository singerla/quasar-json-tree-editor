import { h } from 'vue';
import { setupComponent, setupDefaults, vd } from '../index';
import QJsonTreeFieldPre from '../fields/QJsonTreeFieldPre';
import QJsonTreeNodePre from './QJsonTreeNodePre';
import QJsonTreeArrayPre from '../containter/QJsonTreeArrayPre';

export default {
  name: 'QJsonTreeElementPre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    if (c.hasProperties()) {
      return () => h(QJsonTreeNodePre, c.hPropParams('property'));
    } else if (c.isArray()) {
      return () => h(QJsonTreeArrayPre, c.hSortableParams());
    } else {
      return () => h(QJsonTreeFieldPre, c.hScalarParams('scalar'));
    }
  },
};
