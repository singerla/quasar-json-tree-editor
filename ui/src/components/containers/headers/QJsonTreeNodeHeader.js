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
    const hProps = setupComponent(props, emit).hProps({
      addProps: {
        onClick: (e) => {
          e.stopPropagation();
        },
      },
    });
    return () =>
      h(QJsonTreeHeader, hProps, {
        icon: () => h(QIcon, { name: 'data_object' }),
        menu: () => h(QJsonTreeMenu, hProps),
      });
  },
};
