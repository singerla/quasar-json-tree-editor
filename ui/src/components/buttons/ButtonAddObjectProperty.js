import {setupComponent, setupDefaults} from '../index';
import { h } from 'vue';
import { QBtn } from 'quasar';

export default {
  name: 'ButtonAddObjectProperty',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);
    return () => [
      h(QBtn, {
        class: 'q-pa-sm q-ma-sm',
        color: 'primary',
        rounded: true,
        dense: true,
        noCaps: true,
        icon: 'add',
        label: c.getKey(),
        onClick: () => c.createProperty(),
      }),
    ];
  },
};
