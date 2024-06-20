import { setupComponent, setupDefaults, vd } from '../index';
import { computed, h, ref, watch, watchEffect } from 'vue';
import QJsonTreeEditorField from '../fields/QJsonTreeEditorField';
import { QIcon, QItem, QItemSection, QList } from 'quasar';
import { useDraggable } from 'vue-draggable-plus';

export default {
  name: 'QJsonTreeEditorArrayDraggable',
  props: [...setupDefaults.props, 'index'],
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const component = setupComponent(props, emit);
    const hProps = component.hPropsIndexed({}, props.index);

    // const tmpData = computed(() => {
    //   vd('has changed');
    //   // return component.getLocalData();
    // });
    // hProps['onUpdate:modelValue'] = (newVal) => {
    //   vd(newVal);
    //   // vd(component.getParentData());
    // };

    return () =>
      h(
        QItem,
        {
          key: 'field_' + component.propKey.value + '_' + props.index,
          class: 'q-json-tree-list-item',
        },
        () => [
          h(
            QItemSection,
            {
              avatar: true,
              style: 'min-width: 20px; width: 20px',
            },
            () => [
              h(QIcon, {
                name: 'drag_indicator',
              }),
            ]
          ),
          h(QItemSection, () => h(QJsonTreeEditorField, hProps)),
          // h(QItemSection, () => h('pre', tmpData.value)),
        ]
      );
  },
};
