import { h } from 'vue';
import { QChip, QItem, QItemLabel, QItemSection } from 'quasar';
import { setupComponent, setupDefaults } from '../../index';

export default {
  name: 'HeaderItem',
  props: [...setupDefaults.props, 'showType', 'showKey'],
  emits: setupDefaults.emits,
  setup(props, { slots, emit }) {
    const c = setupComponent(props, emit);
    return () =>
      h(
        QItem,
        {
          class: 'q-json-tree-header full-width q-pa-none q-ma-none',
        },
        () => [
          h(QItemSection, { avatar: true }, () => slots.icon()),
          h(QItemSection, () => [
            h(QItemLabel, {}, () => c.getKey()),
            h(QItemLabel, { caption: true }, () => c.getType()),
          ]),
          props.schema.items
            ? h(QItemSection, { side: true }, () => [
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
              ])
            : h('div'),
          h(QItemSection, { avatar: true }, () => slots.menu()),
        ]
      );
  },
};
