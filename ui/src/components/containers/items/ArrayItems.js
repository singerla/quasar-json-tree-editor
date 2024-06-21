import { h } from 'vue';
import { setupComponent, setupDefaults, vd } from '../../index';
import TreeNode from '../../tree/TreeNode';
import TreeField from '../../tree/TreeField';
import ContainerType from '../ContainerType';
import SortableList from '../../lists/SortableList';
import SortableListItem from '../../lists/SortableListItem';
import { QBtn } from 'quasar';

export default {
  name: 'ArrayItems',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    let add,
      type,
      component = TreeNode;

    if (c.childIsArray()) {
      type = 'array of arrays';
    } else if (c.childIsObject()) {
      type = 'array of objects';
    } else {
      type = 'array of scalars';
      component = TreeField;
      add = {
        updateModelValue: true,
      };
    }

    const arrayComponents = {
      getDefault: () =>
        c.getData().map((item, index) => {
          return h(component, c.hParams(index, type, add));
        }),
      getSortable: () =>
        h(SortableList, c.props(), () =>
          c.getData().map((item, index) => {
            return h(
              SortableListItem,
              c.props({ key: c.getUniqueKey(item, index) }),
              () => h(component, c.hParams(index, type, add))
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

    return () => [
      h(ContainerType, c.props({ class: 'q-ml-md' }), () => arrayComponent()),
      h(QBtn, {
        class: 'q-ma-sm',
        rounded: true,
        color: 'primary',
        noCaps: true,
        size: 'md',
        icon: 'add',
        onClick: () => c.addItem(),
      }),
    ];
  },
};
