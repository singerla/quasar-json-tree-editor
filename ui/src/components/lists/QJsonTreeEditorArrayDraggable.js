import { setupComponent, setupDefaults } from '../index';
import { computed, h, ref, watch } from 'vue';
import QJsonTreeEditorField from '../fields/QJsonTreeEditorField';
import { QIcon, QItem, QItemSection, QList } from 'quasar';
import { useDraggable } from 'vue-draggable-plus';

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

    const draggableData = ref([]);
    watch(
      component.getLocalData(),
      (data) => {
        data.forEach((item, index) => {
          if (!draggableData.value.find((ex) => ex.id === index)) {
            draggableData.value.push({
              value: item,
              id: index,
            });
          }
        });
      },
      { immediate: true }
    );

    const updateLocalData = () => {
      component.setLocalData(draggableData.value.map((item) => item.value));
    };

    useDraggable(el, draggableData, {
      animation: 150,
      group,
      onStart() {
        oldValue.value = component.getLocalData();
      },
      onEnd() {
        wasSorted.value = true;
        updateLocalData();
        wasSorted.value = false;
      },
    });

    const getListItem = (item) => {
      const hProps = component.hPropsIndexed(
        {
          propKey: 'field_' + item.id,
          schema: component.localSchema.value.items,
          parentSchema: component.localSchema.value,
          parentData: component.getLocalData(),
        },
        item.id
      );

      hProps.modelValue = computed(() => item.value);
      hProps['onUpdate:modelValue'] = (fieldVal) => {
        item.value = fieldVal;
        updateLocalData();
      };

      return {
        props: {
          key: 'field_' + component.propKey.value + '_' + item.id,
          class: 'q-json-tree-list-item',
        },
        children: [
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
        ],
      };
    };

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
            const item = getListItem(value, index);
            return h(QItem, item.props, () => item.children);
          })
      );
  },
};
