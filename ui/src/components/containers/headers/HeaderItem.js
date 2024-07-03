import { h } from 'vue';
import { QChip, QIcon, QItem, QItemLabel, QItemSection, QSpace } from 'quasar';
import { setupComponent, setupDefaults } from '../../index';
import ContainerMenu from '../menus/ContainerMenu';

export default {
  name: 'HeaderItem',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    const params = c.getSchemaParam('header', {
      sections: ['icon', 'info', 'label', 'space', 'menu'],
      icon: { name: 'data_object', size: 'sm' },
    });

    const schema = c.getSchema();
    const title = schema.title || c.getKey();
    const description = schema.description;

    const infoLabel = () => {
      const ret = [schema.type];
      if (schema.items) {
        ret.push('of ' + schema.items.type + 's');
      }
      return ret.join(' ');
    };

    const sideItems = ['icon', 'menu', 'info', 'index'];

    const availableSections = {
      space: () => h(QSpace),
      icon: () => h(QIcon, params.icon),
      menu: () => h(ContainerMenu, c.props({})),
      label: () => [
        h(QItemLabel, {}, () => title),
        description
          ? h(QItemLabel, { caption: true }, () => description)
          : null,
      ],
      info: () =>
        h(QChip, {
          label: infoLabel(),
          size: 'sm',
          class: 'q-pa-xs',
          color: 'grey-5',
        }),
      index: () =>
        h(QChip, {
          label: '#' + c.getIndex(),
          size: 'sm',
          class: 'q-pa-md',
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
                side: sideItems.includes(section),
              },
              () => availableSections[section]()
            );
          })
      );
  },
};
