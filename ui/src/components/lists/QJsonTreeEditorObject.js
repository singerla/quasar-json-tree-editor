import { clearItemByType, hasChildren, setupDefaults, vd } from '../index';
import { h } from 'vue';
import QJsonTreeEditorField from '../fields/QJsonTreeEditorField';
import { QItem, QItemSection } from 'quasar';
import QJsonTreeNode from '../containers/QJsonTreeNode';

export default {
  name: 'QJsonTreeEditorObject',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const { localData, localSchema, parentSchema, propKey, updated } =
      setupDefaults.local(props, emit);

    const clear = clearItemByType(localData, localSchema);
    const drop = () => {
      vd('drop ');
    };

    const getType = (propKey, schema) => {
      return hasChildren(localSchema.value).value
        ? h(QJsonTreeNode, {
            modelValue: localData.value[propKey],
            'onUpdate:modelValue': (value) =>
              (localData.value[propKey] = value),
            propKey: propKey,
            schema: schema,
            parentSchema: localSchema,
            onUpdated: updated,
          })
        : h(QJsonTreeEditorField, {
            modelValue: localData.value[propKey],
            'onUpdate:modelValue': (value) =>
              (localData.value[propKey] = value),
            propKey: propKey,
            schema: schema,
            parentSchema: localSchema,
            onUpdated: updated,
            onDrop: drop,
          });
    };

    const children = [];
    for (const propKey in localSchema.value.properties) {
      children.push(
        h(
          QItem,
          {
            key: 'prop_' + propKey,
            class: 'q-json-tree-object q-pa-none q-ma-none',
          },
          () => getType(propKey, localSchema.value.properties[propKey])
        )
      );
    }

    return () => children;
  },
};
