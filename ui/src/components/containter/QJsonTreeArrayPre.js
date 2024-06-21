import { h } from 'vue';
import {setupComponent, setupDefaults, vd} from '../index';
import QJsonTreeNodePre from '../containers/QJsonTreeNodePre';
import QJsonTreeFieldPre from '../fields/QJsonTreeField';
import QJsonTreeContainerPre from '../fields/QJsonTreeContainerPre';
import QJsonTreeEditorArraySortablePre from '../lists/QJsonTreeEditorArraySortablePre';
import QJsonTreeEditorArraySortableItemPre from '../lists/QJsonTreeEditorArraySortableItemPre';
import { QBtn } from 'quasar';

export default {
  name: 'QJsonTreeArrayPre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    let add,
      type,
      component = QJsonTreeNodePre;

    if (c.childIsArray()) {
      type = 'array of arrays';
    } else if (c.childIsObject()) {
      type = 'array of objects';
    } else {
      type = 'array of scalars';
      component = QJsonTreeFieldPre;
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
        h(QJsonTreeEditorArraySortablePre, c.hSortableParams(), () =>
          c.getData().map((item, index) => {
            return h(
              QJsonTreeEditorArraySortableItemPre,
              { ...c.hDefaultParams(), key: c.getUniqueKey(item, index) },
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
      h(QJsonTreeContainerPre, c.hSortableParams('q-ml-md'), () =>
        arrayComponent()
      ),
      h(QBtn, {
        class: 'q-ma-sm',
        rounded: true,
        color: "primary",
        noCaps: true,
        size: 'md',
        icon: 'add',
        onClick: () => c.addItem(),
      }),
    ];
  },
};
