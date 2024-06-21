import { setupComponent, setupDefaults } from '../../index';
import { h } from 'vue';
import { QIcon } from 'quasar';
import ContainerMenu from '../menus/ContainerMenu';
import HeaderItem from './HeaderItem';

export default {
  name: 'ContainerHeader',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);
    return () =>
      h(
        HeaderItem,
        c.props({
          class: 'q-json-tree-node-header',
          emitsUpdated: false,
          updatesModel: false,
        }),
        {
          icon: () => h(QIcon, { name: 'data_object' }),
          menu: () =>
            h(
              ContainerMenu,
              c.props({
                initsUpdated: true,
              })
            ),
        }
      );
  },
};
