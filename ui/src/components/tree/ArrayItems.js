import { computed, h } from 'vue';
import { setupComponent, setupDefaults } from '../index';
import TreeNode from './TreeNodeContainer';
import TreeField from '../fields/TreeField';
import SortableList from '../lists/SortableList';
import SortableListItem from '../lists/SortableListItem';
import ButtonAddArrayItem from '../buttons/ButtonAddArrayItem';

export default {
  name: 'ArrayItems',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    let add,
      component = TreeNode;

    if (!c.childIsArray() && !c.childIsObject()) {
      component = TreeField;
      add = {
        updateModelValue: true,
      };
    }

    const arrayComponents = {
      getDefault: () =>
        c.getData().map((item, index) => {
          return h(
            component,
            c.props({
              hasIndexedModel: true,
              index: index,
              key: index,
              schema: c.getSchema().items,
              propKey: c.getKey() + '_' + index,
            })
          );
        }),
      getSortable: () =>
        h(SortableList, c.props(), () =>
          c.getData().map((item, index) => {
            return h(
              SortableListItem,
              c.props({ key: c.getUniqueKey(item, index) }),
              () =>
                h(
                  component,
                  c.props({
                    hasIndexedModel: true,
                    index: index,
                    key: index,
                    schema: c.getSchema().items,
                    propKey: c.getKey() + '_' + index,
                  })
                )
            );
          })
        ),
    };

    const isSortable = computed(() => c.getSchemaParam('sortable'));

    return () =>
      !c.dataHasLength()
        ? h(ButtonAddArrayItem, c.props())
        : isSortable.value
          ? arrayComponents.getSortable()
          : arrayComponents.getDefault();
  },
};
