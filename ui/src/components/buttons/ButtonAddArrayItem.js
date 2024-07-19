import { setupComponent, setupDefaults } from '../index';
import { h, inject, provide } from 'vue';
import { QBtn } from 'quasar';

export default {
  name: 'ButtonAddArrayItem',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    const customBtn = inject('addItemToArrayButton', null);
    if (customBtn) {
      return () =>
        h(customBtn, {
          label: c.getKey(),
          onClick: () => c.addItem(),
        });
    }

    return () =>
      h(QBtn, {
        class: 'q-pa-sm q-ma-sm q-json-tree-add-button',
        color: 'primary',
        rounded: true,
        dense: true,
        noCaps: true,
        icon: 'add',
        label: c.getKey(),
        onClick: () => c.addItem(),
      })
  },
};
