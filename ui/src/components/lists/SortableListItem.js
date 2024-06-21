import { setupComponent, setupDefaults } from '../index';
import { h } from 'vue';
import { QIcon, QItem, QItemSection } from 'quasar';

export default {
  name: 'SortableListItem',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit, slots }) {
    const c = setupComponent(props, emit);
    return () =>
      h(
        QItem,
        {
          key: 'field_' + c.getKey() + '_' + c.getIndex(),
          class: 'q-json-tree-list-item',
        },
        () => [
          h(
            QItemSection,
            {
              avatar: true,
              style: 'min-width: 20px; width: 20px; margin-right: 8px;',
            },
            () => [
              h(QIcon, {
                name: 'drag_indicator',
              }),
            ]
          ),
          h(QItemSection, {}, () => slots.default()),
        ]
      );
  },
};
