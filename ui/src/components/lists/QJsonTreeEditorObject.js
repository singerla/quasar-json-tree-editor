import { hasChildren, setupComponent, setupDefaults, vd } from '../index';
import { computed, h } from 'vue';
import QJsonTreeEditorField from '../fields/QJsonTreeEditorField';
import { QItem } from 'quasar';
import QJsonTreeNode from '../containers/QJsonTreeNode';
import ButtonAddObjectProperty from '../buttons/ButtonAddObjectProperty';

export default {
  name: 'QJsonTreeEditorObject',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const parent = setupComponent(props, emit);
    const localData = parent.getLocalData({});
    const schema = parent.getLocalSchema();

    const isUndefined = (propKey) =>
      !localData || localData[propKey] === undefined;

    return () =>
      parent.getProperties().map((propKey) => {
        const childHProps = parent.hPropsIndexed(
          {
            propKey,
            schema: schema.properties[propKey],
            parentSchema: schema,
            update: (val) => {
              vd(hasChildren(parent.localSchema.value).value);
              const tmpData = { ...localData };
              tmpData[propKey] = val;
              vd(tmpData);
              parent.setLocalData(tmpData);
            },
          },
          propKey
        );

        if (isUndefined(propKey)) {
          return h(ButtonAddObjectProperty, childHProps);
        }

        return h(
          QItem,
          {
            key: 'prop_' + propKey,
            class: 'q-json-tree-object q-pa-none q-ma-none',
          },
          () =>
            hasChildren(parent.localSchema.value).value
              ? h(QJsonTreeNode, childHProps)
              : h(QJsonTreeEditorField, childHProps)
        );
      });
  },
};
