import { h } from 'vue';
import { setupComponent, setupDefaults, vd } from '../index';
import Division from './types/Division';
import Expansion from './types/Expansion';
import Card from './types/Card';

export default {
  name: 'ContainerType',
  props: setupDefaults.props,
  setup(props, { emit, slots }) {
    const c = setupComponent(props, emit);

    const containerType = c.getSchemaParam('container', 'card').toLowerCase();

    const map = {
      division: Division,
      expansion: Expansion,
      card: Card,
    };
    let component = map[containerType] || Card;
    return () =>
      h(
        component,
        c.props({
          class: c.getSchemaClass('q-json-tree-node'),
        }),
        () => slots.default()
      );
  },
};
