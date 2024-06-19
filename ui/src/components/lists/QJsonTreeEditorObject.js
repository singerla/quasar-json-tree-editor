import { hasChildren, setupComponent, setupDefaults } from '../index';
import { h } from 'vue';
import QJsonTreeEditorField from '../fields/QJsonTreeEditorField';
import { QItem } from 'quasar';
import QJsonTreeNode from '../containers/QJsonTreeNode';
import ButtonAddObjectProperty from '../buttons/ButtonAddObjectProperty';

export default {
  name: 'QJsonTreeEditorObject',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const parent = setupComponent(props, emit, 'QJsonTreeEditorObject');
    const localData = parent.getLocalData({});
    const isUndefined = (propKey) =>
      !localData || localData[propKey] === undefined;

    // const modelValue = computed(() => {
    //   vd('computed root')
    //   return props.modelValue
    // })
    // watch(modelValue, (val) => {
    //   vd('updated QJsonTreeEditorObject modelValue')
    //   vd(val)
    // }, {deep: true})

    return () =>
      parent.getProperties().map((propKey) => {
        const childHProps = parent.childHProps(propKey);

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
