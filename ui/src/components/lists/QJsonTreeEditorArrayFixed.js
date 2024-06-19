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
      parent.getLocalData().value.map((child, index) => {
        const hProps = parent.itemHProps(index);
        return h(
          QItem,
          {
            dense: true,
            key: 'field_' + parent.propKey.value + '_' + index,
            class: 'q-json-tree-list-item q-pa-none q-ma-none',
          },
          () => h(QItemSection, {}, () => h(QJsonTreeEditorField, hProps))
        );
      });
  },
};
