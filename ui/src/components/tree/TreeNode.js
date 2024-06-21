import { h } from 'vue';
import { setupComponent, setupDefaults } from '../index';
import ObjectProperties from '../containers/items/ObjectProperties';
import ArrayElements from '../containers/items/ArrayElements';
import ContainerType from '../containers/ContainerType';
import Message from '../fields/Message';

export default {
  name: 'QJsonTreeNodePre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    let component = Message;
    if (c.isObject()) {
      component = ObjectProperties;
    } else if (c.isArray()) {
      component = ArrayElements;
    }

    return () => h(ContainerType, c.props({}), () => h(component, c.props()));
  },
};
