import { h } from 'vue';
import { QChip, QIcon, QItem, QItemLabel, QItemSection, QSpace } from 'quasar';
import { setupComponent, setupDefaults } from '../../index';
import ContainerMenu from '../menus/ContainerMenu';

export default {
  name: 'HeaderItem',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { slots, emit }) {
    const c = setupComponent(props, emit);

    const params = c.getSchemaParam('header', {
      sections: ['icon', 'info', 'label', 'space', 'menu'],
      icon: { name: 'data_object', size: 'sm' },
    });
    const description = c.getSchema().description || c.getKey();

    const infoLabel = () => {
      const ret = [props.schema.type];
      if (props.schema.items) {
        ret.push('of ' + props.schema.items.type + 's');
      }
      return ret.join(' ');
    };

    const availableSections = {
      space: () => h(QSpace),
      icon: () => h(QIcon, params.icon),
      menu: () => h(ContainerMenu, c.props({})),
      label: () => h(QItemLabel, {}, () => description),
      info: () =>
        h(QChip, {
          label: infoLabel(),
          size: 'sm',
          class: 'q-pa-xs',
          color: 'grey-5',
        }),
    };

    const sections = params.sections || [];

    return () =>
      h(
        QItem,
        {
          ...c.props(),
          class: 'q-json-tree-header full-width',
        },
        () =>
          sections.map((section) => {
            return h(
              QItemSection,
              {
                ...c.props(),
                side: ['icon', 'menu', 'info'].includes(section),
              },
              () => availableSections[section]()
            );
          })
      );
  },
};
