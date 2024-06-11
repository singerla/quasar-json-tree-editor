import {
  clearItemByType,
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
  name: 'QJsonTreeEditorObject',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const drop = () => {
      vd('drop ');
    };

    const parent = setupComponent(props, emit);

    const getType = (propKey, schema) => {
      const hProps = parent.hProps({
        modelKey: propKey,
        propKey,
        schema: schema,
        parentSchema: parent.localSchema.value,
        clear: clearItemByType,
        drop,
      });

      return hasChildren(parent.localSchema.value).value
        ? h(QJsonTreeNode, hProps)
        : h(QJsonTreeEditorField, hProps);
    };

    const children = [];
    for (const propKey in parent.localSchema.value.properties) {
      children.push(
        h(
          QItem,
          {
            key: 'prop_' + propKey,
            class: 'q-json-tree-object q-pa-none q-ma-none',
          },
          () => getType(propKey, parent.localSchema.value.properties[propKey])
        )
      );
    }

    return () => children;
  },
};
