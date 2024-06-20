import { h, toRef, watch } from 'vue';
import { setupComponent, setupDefaults, vd } from '../index';
import QJsonTreeNodeDivision from './QJsonTreeNodeDivision';
import QJsonTreeNodeCard from './QJsonTreeNodeCard';
import QJsonTreeNodeExpansion from './QJsonTreeNodeExpansion';

export default {
  name: 'QJsonTreeNode',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const component = setupComponent(props, emit);

    const hProps = component.hProps({
      updated: (data) => {
        if (data.path) {
          data.path.push(props.propKey);
        }
        emit('updated', data);
      },
    });

    const components = {
      Card: QJsonTreeNodeCard,
      Expansion: QJsonTreeNodeExpansion,
      Division: QJsonTreeNodeDivision,
    };

    const componentKey = component.getSchemaParam('container');
    const targetComponent = components[componentKey] || components.Division;

    return () => [
      h(
        'div',
        {
          class: 'q-json-tree-node',
        },
        [h(targetComponent, hProps)]
      ),
    ];
  },
};
