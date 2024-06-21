import {setupComponent, setupDefaults, vd} from '../index';
import { computed, h, ref } from 'vue';
import { QList } from 'quasar';
import { useDraggable } from 'vue-draggable-plus';

export default {
  name: 'QJsonTreeEditorArraySortablePre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit, slots }) {
    const c = setupComponent(props, emit);
    const el = ref(null);
    const oldValue = ref(c.getData());
    const group = c.getSchemaParam('group', {});

    const emitNewList = (newList) => {
      const flattened = newList.map((item) => item.value);
      emit('update:modelValue', flattened);
      emit('updated', {
        path: [c.initPath()],
        wasSorted: true,
        oldValue: oldValue.value,
        newValue: flattened,
      });
    };

    const draggableData = computed({
      get: () => {
        if (!Array.isArray(c.getData())) {
          return [];
        }
        return c.getData().map((item, index) => {
          return {
            value: item,
            id: c.getKey() + '_' + (item.id || index),
          };
        });
      },
      set: emitNewList,
    });

    useDraggable(el, draggableData, {
      animation: 150,
      group,
      onStart() {
        vd(draggableData.value)
        oldValue.value = c.getData();
      },
      onAdd() {
        emitNewList(draggableData.value);
      },
      onRemove() {
        emitNewList(draggableData.value);
      },
      onEnd() {},
    });

    return () =>
      h(
        QList,
        {
          ref: el,
          key: 'list_' + c.getKey(),
          class: 'q-json-tree-list',
        },
        () => slots.default()
      );
  },
};
