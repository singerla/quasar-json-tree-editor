import { h } from 'vue';
import { QChip, QItem, QItemLabel, QItemSection } from 'quasar';

export default {
  name: 'QJsonTreeHeader',
  props: ['schema', 'propKey', 'showType', 'showKey'],
  emits: [],
  setup(props, { slots }) {
    return () =>
      h(
        QItem,
        {
          class: 'q-json-tree-header full-width q-pa-none q-ma-none',
        },
        () => [
          h(QItemSection, { avatar: true }, () => slots.icon()),
          h(QItemSection, () => [
            h(QItemLabel, { caption: true }, props.propkey),
          ]),
          h(QItemSection, { side: true }, () =>
            h(QChip, {
              label: props.schema.type,
              color: 'grey-2',
            })
          ),
          h(QItemSection, { side: true }, () =>
            h(QChip, {
              label: 'of ' + props.schema.items.type + 's',
              color: 'grey-6',
            })
          ),
          h(QItemSection, { avatar: true }, () => slots.menu()),
        ]
      );
  },
};
