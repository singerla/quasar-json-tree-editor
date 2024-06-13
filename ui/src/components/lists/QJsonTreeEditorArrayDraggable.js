import { setupComponent, setupDefaults, vd } from '../index';
import { computed, h, ref } from 'vue';
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

    const component = setupComponent(props, emit, null, (value) => {
      emit('updated', {
        propKey: props.propKey,
        wasSorted: true,
        newValue: value,
        oldValue: oldValue.value,
        path: [],
      });
    });

    const group =
      component.localSchema.value.params &&
      component.localSchema.value.params.group
        ? component.localSchema.value.params.group
        : {};

    const getListItem = (index) => {
      const hProps = component.hProps({
        modelKey: index,
        propKey: 'field_' + index,
        schema: component.localSchema.value.items,
        parentSchema: component.localSchema.value,
        add: (value) => {
          vd(value);
          emit('add', value);
        },
        drop: (i) => {
          vd('drop ' + i);
          // emit('drop', index);
        },
      });

      return {
        props: {
          key:
            'field_' +
            component.propKey.value +
            '_' +
            index +
            '_' +
            Math.random(),
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
          h(QItemSection, {}, () => h(QJsonTreeEditorField, hProps)),
        ],
      };
    };

    useDraggable(el, component.getLocalData(), {
      animation: 150,
      group,
      onStart() {
        oldValue.value = component.getLocalData();
        console.log('start');
      },
      onUpdate() {},
      onEnd() {},
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
          component.getLocalData().map((child, index) => {
            const item = getListItem(index);
            return h(QItem, item.props, () => item.children);
          })
      );
  },
};
