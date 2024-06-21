import { h } from 'vue';
import { setupComponent, setupDefaults } from '../../index';
import QJsonTreeElementPre from '../../tree/TreeElement';
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
          QJsonTreeElementPre,
          c.props({
            hasIndexedModel: true,
            index: propKey,
            key: propKey,
            schema: c.getSchema().properties[propKey],
            propKey: c.getKey() + '_' + propKey,
            type: propKey,
          })
        );
      });
  },
};
