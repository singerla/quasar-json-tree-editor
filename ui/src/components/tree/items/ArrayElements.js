import { h } from 'vue';
import { setupComponent, setupDefaults } from '../../index';
import TreeElement from '../TreeElement';

export default {
  name: 'ArrayElements',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    return () =>
      c.getData().map((item, index) => {
        return h(
          TreeElement,
          c.props({
            key: index,
            hasIndexedModel: true,
            schema: c.getSchema().items,
            propKey: c.getKey() + '_' + index,
            index: index,
          })
        );
      });
  },
};
