import { h } from 'vue';
import { setupComponent, setupDefaults } from '../index';
import QJsonTreeElementPre from './QJsonTreeElementPre';
import ButtonAddObjectProperty from '../buttons/ButtonAddObjectProperty';

export default {
  name: 'QJsonTreeNodeObjectPre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);
    return () =>
      c.getProperties().map((propKey) => {
        if (!c.dataHasProperty(propKey)) {
          return h(ButtonAddObjectProperty, { ...c.hSortableParams(), propKey });
        }

        return h(
          QJsonTreeElementPre,
          c.hParams(propKey, 'element from object prop', {
            updateModelValue: true,
            onUpdatedPush: false,
            schemaFromProperties: true,
          })
        );
      });
  },
};
