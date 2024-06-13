import { addItemToArray, setupComponent, setupDefaults, vd } from '../index';
import { h } from 'vue';
import QJsonTreeEditorArrayFixed from './QJsonTreeEditorArrayFixed';
import QJsonTreeEditorArrayDraggable from './QJsonTreeEditorArrayDraggable';

export default {
  name: 'QJsonTreeEditorArray',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const parent = setupComponent(props, emit);
    const hProps = parent.hProps({
      clear: () => {
        vd('clear');
        parent.setLocalData([]);
      },
      drop: (index) => {
        vd('drop');
        // parent.getLocalData().splice(index, 1);
      },
      add: (val) =>
        addItemToArray(parent.getLocalData(), parent.localSchema.value)(val),
    });

    const components = {
      Draggable: QJsonTreeEditorArrayDraggable,
      Fixed: QJsonTreeEditorArrayFixed,
    };
    const componentKey = parent.localSchema.value.params?.sortable
      ? 'Draggable'
      : 'Fixed';
    const component = components[componentKey] || components.Fixed;

    return () => h(component, hProps);
  },
};
