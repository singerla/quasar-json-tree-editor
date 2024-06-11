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

    const { localData, localSchema, parentSchema, propKey, updated } =
      setupDefaults.local(props, emit);

    if (!localData.value) {
      return () => [];
    }

    for (const localDataFieldKey in Object.keys(localData.value)) {
      const hProps = setupComponent(props, emit).hProps({
        localData: localData.value[localDataFieldKey],
        propKey: 'field_' + localDataFieldKey,
        schema: localSchema.value.items,
        parentSchema: localSchema.value,
        drop: () => localData.value.splice(localDataFieldKey, 1),
      });

      children.push(
        h(
          QItem,
          {
            key: 'field_' + propKey.value + '_' + localDataFieldKey,
            class: 'q-json-tree-list-item q-pa-none q-ma-none',
          },
          () => h(QItemSection, {}, () => h(QJsonTreeEditorField, hProps))
        )
      );
    }

    return () => children;
  },
};
