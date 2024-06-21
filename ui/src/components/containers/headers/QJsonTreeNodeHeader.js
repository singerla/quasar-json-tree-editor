import { setupComponent, setupDefaults } from '../../index';
import { h } from 'vue';
import { QIcon } from 'quasar';
import QJsonTreeMenu from '../../menus/QJsonTreeMenu';
import QJsonTreeHeader from './QJsonTreeHeader';

export default {
  name: 'QJsonTreeNodeHeader',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);
    return () =>
      h(QJsonTreeHeader, c.hDefaultParams('q-json-tree-node-header'), {
        icon: () => h(QIcon, { name: 'data_object' }),
        menu: () => h(QJsonTreeMenu, c.hSortableParams()),
      });
  },
};
