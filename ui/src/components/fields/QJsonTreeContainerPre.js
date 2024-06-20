import { h } from 'vue';
import {setupComponent, setupDefaults, vd} from '../index';

export default {
  name: 'QJsonTreeContainerPre',
  props: setupDefaults.props,
  setup(props, { emit, slots }) {
    const c = setupComponent(props, emit);

    return () =>
      h(
        'div',
        {
          class: c.getClass(),
          style: 'border: 1px dotted orange;'
        },
        slots.default()
      );
  },
};
