import { setupComponent, setupDefaults } from '../../index';
import { h, ref } from 'vue';
import QJsonTreeNodeHeader from '../headers/ContainerHeader';
import { QExpansionItem } from 'quasar';

export default {
  name: 'QJsonTreeNodeExpansion',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit, slots }) {
    const c = setupComponent(props, emit);
    const state = ref(true);

    return () => [
      h(
        QExpansionItem,
        {
          dense: true,
          modelValue: state.value,
          'onUpdate:modelValue': (val) => (state.value = val),
          class: 'q-json-tree-node-expansion q-pa-none q-ma-none',
          headerStyle: c.getSchemaParam('headerStyle', 'margin: 0; padding: 0'),
        },
        {
          header: () => h(QJsonTreeNodeHeader, c.props()),
          default: () => slots.default(),
        }
      ),
    ];
  },
};
