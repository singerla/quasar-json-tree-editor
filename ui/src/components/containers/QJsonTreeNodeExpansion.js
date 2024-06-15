import { setupDefaults, setupComponent, vd } from '../index';
import { h, ref } from 'vue';
import QJsonTreeElement from './QJsonTreeElement';
import QJsonTreeNodeHeader from './headers/QJsonTreeNodeHeader';
import { QExpansionItem } from 'quasar';

export default {
  name: 'QJsonTreeNodeExpansion',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const hProps = setupComponent(props, emit).hProps({});
    const state = ref(true);

    return () => [
      h(
        QExpansionItem,
        {
          dense: true,
          modelValue: state.value,
          'onUpdate:modelValue': (val) => (state.value = val),
          class: 'q-json-tree-node-expansion q-pa-none q-ma-none',
          headerStyle: 'background-color: #eee; margin: 0; padding: 0',
        },
        {
          header: () => h(QJsonTreeNodeHeader, hProps),
          default: () => h(QJsonTreeElement, hProps),
        }
      ),
    ];
  },
};
