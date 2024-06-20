import { h } from 'vue';
import { setupComponent, setupDefaults, vd } from '../index';
import { QInput } from 'quasar';
import QJsonTreeNodePre from '../containers/QJsonTreeNodePre';
import QJsonTreeFieldPre from '../fields/QJsonTreeFieldPre';
import QJsonTreeContainerPre from '../fields/QJsonTreeContainerPre';
import QJsonTreeEditorArraySortablePre from '../lists/QJsonTreeEditorArraySortablePre';
import QJsonTreeEditorArraySortableItemPre from '../lists/QJsonTreeEditorArraySortableItemPre';

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
              c.hDefaultParams(),
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

    return () =>
      h(QJsonTreeContainerPre, c.hDefaultParams('q-ml-md'), () =>
        arrayComponent()
      );
  },
};
