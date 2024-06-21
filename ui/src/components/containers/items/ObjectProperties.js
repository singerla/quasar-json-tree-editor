import { h } from 'vue';
import { setupComponent, setupDefaults } from '../../index';
import TreeElement from '../../tree/TreeElement';
import ButtonAddObjectProperty from '../../buttons/ButtonAddObjectProperty';

export default {
  name: 'ObjectProperties',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);
    return () =>
      c.getProperties().map((propKey) => {
        if (!c.dataHasProperty(propKey)) {
          return h(
            ButtonAddObjectProperty,
            c.props({
              propKey: propKey,
            })
          );
        }

        return h(
          TreeElement,
          c.props({
            hasIndexedModel: true,
            index: propKey,
            key: c.getKey() + '_' + propKey,
            schema: c.getSchema().properties[propKey],
            propKey: propKey,
            type: 'ObjectProperties',
          })
        );
      });
  },
};
