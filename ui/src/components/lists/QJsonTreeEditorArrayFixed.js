import { setupComponent, setupDefaults, vd } from '../index';
import { h } from 'vue';
import QJsonTreeEditorField from '../fields/QJsonTreeEditorField';
import { QItem, QItemSection } from 'quasar';

export default {
  name: 'QJsonTreeEditorArrayFixed',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const parent = setupComponent(props, emit);

    return () =>
      parent.getLocalData().map((child, index) => {
        const hProps = parent.hProps({
          modelKey: index,
          propKey: 'field_' + index,
          schema: parent.localSchema.value.items,
          parentSchema: parent.localSchema.value,
          drop: () => parent.getLocalData().splice(index, 1),
        });

        return h(
          QItem,
          {
            key: 'field_' + parent.propKey.value + '_' + index,
            class: 'q-json-tree-list-item q-pa-none q-ma-none',
          },
          () => h(QItemSection, {}, () => h(QJsonTreeEditorField, hProps))
        );
      });
  },
};
