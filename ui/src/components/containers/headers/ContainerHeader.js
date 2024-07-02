import {setupComponent, setupDefaults, vd} from '../../index';
import { h, inject } from 'vue';
import { QIcon } from 'quasar';
import ContainerMenu from '../menus/ContainerMenu';
import HeaderItem from './HeaderItem';

export default {
  name: 'ContainerHeader',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    const containerHeader = inject('containerHeader', null);
    if (containerHeader) {
      return () =>
        h(
          containerHeader,
          c.props(
            {
              c: c,
              class: 'q-json-tree-node-header',
              updatesModel: false,
            },
          )
        );
    }

    return () =>
      h(
        HeaderItem,
        c.props({
          'onUpdate:modelValue': (value) => {
            emit('update:modelValue', value);
          },
          class: 'q-json-tree-node-header',
          updatesModel: false,
        }),
      );
  },
};
