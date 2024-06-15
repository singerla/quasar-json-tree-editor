import {
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
import ButtonAddObjectProperty from '../buttons/ButtonAddObjectProperty';

export default {
  name: 'QJsonTreeEditorObject',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const drop = () => {
      vd('drop ');
    };

    const parent = setupComponent(props, emit);

    const getChildComponent = (propKey, schema) => {
      return parent.hProps({
        modelKey: propKey,
        propKey,
        schema: schema,
        parentSchema: parent.localSchema.value,
        clear: clearItemByType,
        drop,
      });
    };

    const localData = parent.getLocalData({});
    const isUndefined = (propKey) =>
      !localData || localData[propKey] === undefined;

    return () =>
      parent.getProperties().map((propKey) => {
        const childHProps = getChildComponent(
          propKey,
          parent.localSchema.value.properties[propKey]
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
