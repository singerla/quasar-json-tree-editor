import { setupComponent, setupDefaults, vd } from '../index';
import { computed, h, ref } from 'vue';
import { QList } from 'quasar';
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

    const draggableData = computed(() => {
      if (!component.getLocalData()?.map) {
        return [];
      }

      return component.getLocalData().map((item, index) => {
        return {
          value: item,
          id: index,
        };
      });
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
        // vd(draggableData.value);
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
            return h(QJsonTreeEditorArrayDraggableItem, {
              ...component.hProps({
                propKey: 'field_' + index,
                schema: component.localSchema.value.items,
                parentSchema: component.localSchema.value,
                parentData: component.getLocalData(),
              }),
              index: index,
            });
          })
      );
  },
};
