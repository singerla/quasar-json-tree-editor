import { h } from 'vue';
import { QChip, QIcon, QItem, QItemLabel, QItemSection } from 'quasar';
import { setupComponent, setupDefaults } from '../../index';
import ContainerMenu from '../menus/ContainerMenu';

export default {
  name: 'HeaderItem',
  props: [...setupDefaults.props, 'showType', 'showKey'],
  emits: setupDefaults.emits,
  setup(props, { slots, emit }) {
    const c = setupComponent(props, emit);
    const parts = {
      icon: () => h(QIcon, { name: 'data_object' }),
      menu: () => h(ContainerMenu, c.props({})),
      label: () => [
        h(QItemLabel, {}, () => c.getKey()),
        h(QItemLabel, { caption: true }, () => c.getType()),
      ],
      schemaInfo: () => [
        h(QChip, {
          label: props.schema.type,
          size: 'sm',
          class: 'q-pa-xs',
          color: 'grey-5',
        }),
        h(QChip, {
          label: props.schema.items
            ? 'of ' + props.schema.items.type + 's'
            : 'default',
          size: 'sm',
          class: 'q-pa-xs',
          color: 'grey-6',
        }),
      ],
    };

    const showHeaderSections = ['icon'];

    return () =>
      h(
        QItem,
        {
          class: 'q-json-tree-header full-width q-pa-none q-ma-none',
        },
        () => [
          h(QItemSection, { avatar: true }, () => slots.icon()),
          h(QItemSection, parts.label()),
          h(QItemSection, { side: true }, parts.schemaInfo()),
          h(QItemSection, { avatar: true }, () => slots.menu()),
        ]
      );
  },
};
