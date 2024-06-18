import { setupComponent, setupDefaults, vd } from '../index';
import { computed, h, ref, watchEffect } from 'vue';
import QJsonTreeEditorField from '../fields/QJsonTreeEditorField';
import { QIcon, QItemSection, QList } from 'quasar';
import { useDraggable } from 'vue-draggable-plus';
import QJsonTreeEditorArrayDraggableItem from './QJsonTreeEditorArrayDraggableItem';

export default {
  name: 'QJsonTreeEditorArrayDraggable',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const el = ref(null);
    const oldValue = ref(null);
    const wasSorted = ref(false);

    const component = setupComponent(props, emit, null, (value) => {
      emit('updated', {
        propKey: props.propKey,
        wasSorted: wasSorted.value,
        newValue: value,
        oldValue: oldValue.value,
        path: [],
      });
    });

    const group = component.getSchemaParam('group', {});

    const draggableData = computed({
      get: () => {
        if(!component.getLocalData()?.map) {
          return []
        }

        return component.getLocalData().map((item, index) => {
          return {
            value: item,
            id: index,
          };
        });
      },
      set: (newList) => {
        // const updateData = newList.map((item) => item.value);
        // component.setLocalData(updateData);
        //
        // vd('post set');
        // vd(updateData);
        // vd(component.getLocalData());
        // el.value.$forceUpdate();
      },
    });

    useDraggable(el, draggableData, {
      animation: 150,
      group,
      onStart() {
        oldValue.value = component.getLocalData();
      },
      onAdd() {
        // rebuildIndex();
        // updateLocalData();
      },
      onRemove() {
        // rebuildIndex();
        // updateLocalData();
      },
      onEnd() {
        // wasSorted.value = true;
        // updateLocalData();
        // wasSorted.value = false;
      },
    });

    return () =>
      h(
        QList,
        {
          ref: el,
          key: 'list_' + component.propKey.value,
          class: 'q-json-tree-list',
        },
        () =>
          draggableData.value.map((value, index) => {
            return h(
              QJsonTreeEditorArrayDraggableItem,
              component.hPropsIndexed({
                propKey: 'field_' + index,
                schema: component.localSchema.value.items,
                parentSchema: component.localSchema.value,
                parentData: component.getLocalData(),
              }, index)
            );
          })
      );
  },
};
