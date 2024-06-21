import { h } from 'vue';
import { setupComponent, setupDefaults } from '../../index';
import TreeElement from '../../tree/TreeElement';

export default {
  name: 'ArrayItems',
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
            propKey: index,
            index: index,
            type: 'ArrayItems',
          })
        );
      });
  },
};
