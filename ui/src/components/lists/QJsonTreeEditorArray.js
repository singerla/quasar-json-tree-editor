import { setupComponent, setupDefaults } from '../index';
import { h } from 'vue';
import QJsonTreeEditorArrayFixed from './QJsonTreeEditorArrayFixed';
import QJsonTreeEditorArrayDraggable from './QJsonTreeEditorArrayDraggable';

export default {
  name: 'QJsonTreeEditorArray',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const parent = setupComponent(props, emit, 'QJsonTreeEditorArray');
    const hProps = parent.hProps({});

    const components = {
      Draggable: QJsonTreeEditorArrayDraggable,
      Fixed: QJsonTreeEditorArrayFixed,
    };
    const componentKey =
      parent.localSchema.value.params &&
      parent.localSchema.value.params.sortable
        ? 'Draggable'
        : 'Fixed';
    const component = components[componentKey] || components.Fixed;

    return () => h(component, hProps);
  },
};
