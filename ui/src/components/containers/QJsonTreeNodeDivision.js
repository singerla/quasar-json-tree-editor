import { setupDefaults, setupComponent, vd } from '../index';
import { h } from 'vue';
import QJsonTreeElement from './QJsonTreeElement';

export default {
  name: 'QJsonTreeNodeDivision',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const hProps = setupComponent(props, emit, 'QJsonTreeNodeDivision').hProps({});
    return () => [
      h(
        'div',
        {
          class: 'q-json-tree-node-division',
        },
        h(QJsonTreeElement, hProps)
      ),
    ];
  },
};
