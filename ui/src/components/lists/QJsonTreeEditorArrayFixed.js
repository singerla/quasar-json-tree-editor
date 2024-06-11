import {
  addItemToArray,
  clearItemByType,
  getPropertyKey,
  hasChildren,
  setupComponent,
  setupDefaults,
  vd,
} from '../index';
import { h } from 'vue';
import QJsonTreeEditorField from '../fields/QJsonTreeEditorField';
import { QItem, QItemSection } from 'quasar';
import QJsonTreeNode from '../containers/QJsonTreeNode';

export default {
  name: 'QJsonTreeEditorArrayFixed',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const parent = setupComponent(props, emit);
    const children = [];

    if (!parent.localData.value) {
      return () => [];
    }

    for (const index in parent.localData.value) {
      const hProps = parent.hProps({
        modelKey: index,
        propKey: 'field_' + index,
        schema: parent.localSchema.value.items,
        parentSchema: parent.localSchema.value,
        drop: () => parent.localData.value.splice(index, 1),
      });

      children.push(
        h(
          QItem,
          {
            key: 'field_' + parent.propKey.value + '_' + index,
            class: 'q-json-tree-list-item q-pa-none q-ma-none',
          },
          () => h(QItemSection, {}, () => h(QJsonTreeEditorField, hProps))
        )
      );
    }

    return () => children;
  },
};
