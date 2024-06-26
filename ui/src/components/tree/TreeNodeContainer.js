import {h} from 'vue';
import {setupComponent, setupDefaults} from '../index';
import ObjectProperties from './items/ObjectProperties';
import ContainerType from '../containers/ContainerType';
import Message from '../fields/Message';
import ArrayItems from '../lists/ArrayItems';

export default {
  name: 'TreeNodeContainer',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    let component = Message;
    if (c.isObject()) {
      component = ObjectProperties;
    } else if (c.isArray()) {
      component = ArrayItems;
    }

    return () => h(ContainerType, c.props({}), () => h(component, c.props()));
  },
};
