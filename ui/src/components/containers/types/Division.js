import { setupComponent, setupDefaults } from '../../index';
import { h } from 'vue';

export default {
  name: 'QJsonTreeNodeDivision',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit, slots }) {
    const c = setupComponent(props, emit);
    return () =>
      h(
        'div',
        {
          class: c.getClass('q-json-tree-node-division'),
        },
        slots.default()
      );
  },
};
