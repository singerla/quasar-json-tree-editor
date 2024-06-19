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

    const component = setupComponent(
      props,
      emit,
      'QJsonTreeEditorArrayDraggable',
      null,
      (value) => {
        emit('updated', {
          propKey: props.propKey,
          wasSorted: wasSorted.value,
          newValue: value,
          oldValue: oldValue.value,
          path: [],
        });
      }
    );

    const group = component.getSchemaParam('group', {});

    const indexed = (list) =>
      list.map((item, index) => {
        return { value: item, id: props.propKey + '_' + index };
      });
    const deIndexed = (list) => list.map((item) => item.value);
    const update = (newList) => {
      component.updateLocalData(deIndexed(newList));
    };

    const draggableData = computed({
      get: () => {
        const index = indexed(component.getLocalData().value)
        vd(index)
        return index;
      },
      set: (newList) => {
        update(newList);
      },
    });

    useDraggable(el, draggableData, {
      animation: 150,
      group,
      onStart() {
        oldValue.value = props.modelValue.value;
      },
      onAdd() {
        update(draggableData.value);
        // rebuildIndex();
        // updateLocalData();
      },
      onRemove() {
        update(draggableData.value);
        // rebuildIndex();
        // updateLocalData();
      },
      onEnd() {
        update(draggableData.value);
        // wasSorted.value = true;
        // update();
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
          draggableData.value.map((value, index) =>
            h(QJsonTreeEditorArrayDraggableItem, component.itemHProps(index))
          )
      );
  },
};
