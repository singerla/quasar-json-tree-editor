import { h } from 'vue';
import {
  addItemByType,
  clearItemByType,
  setupDefaults,
  setupComponent,
  vd,
} from '../index';
import QJsonTreeNodeDivision from './QJsonTreeNodeDivision';

export default {
  name: 'QJsonTreeNode',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const hProps = setupComponent(props, emit).hProps({
      updated: (data) => {
        vd('updated QJsonTreeNode');
        if (data.path) {
          data.path.push(props.propKey);
        }
        emit('updated', data);
      },
      add: addItemByType,
      clear: clearItemByType,
    });

    return () => [
      h(
        'div',
        {
          class: 'q-json-tree-node',
        },
        h(QJsonTreeNodeDivision, hProps)
      ),
    ];
  },
};
