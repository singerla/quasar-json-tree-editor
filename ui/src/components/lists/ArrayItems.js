import { h } from 'vue';
import { setupComponent, setupDefaults, vd } from '../index';
import TreeNode from '../tree/TreeNodeContainer';
import TreeField from '../tree/TreeField';
import ContainerType from '../containers/ContainerType';
import SortableList from './SortableList';
import SortableListItem from './SortableListItem';
import { QBtn } from 'quasar';

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
              propKey: index,
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

    let arrayComponent;
    if (c.getSchemaParam('sortable')) {
      arrayComponent = arrayComponents.getSortable;
    } else {
      arrayComponent = arrayComponents.getDefault;
    }

    return () => arrayComponent();
  },
};
