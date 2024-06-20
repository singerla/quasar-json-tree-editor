import { setupComponent, setupDefaults } from '../index';
import { h } from 'vue';
import { QCard, QCardSection } from 'quasar';
import QJsonTreeNodeHeader from './headers/QJsonTreeNodeHeader';

export default {
  name: 'QJsonTreeNodeCard',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit, slots }) {
    const c = setupComponent(props, emit);
    return () =>
      h(
        QCard,
        {
          class: 'q-json-tree-node-card',
        },
        () => [
          h(
            QCardSection,
            {
              class: 'q-pa-none q-ma-none',
            },
            () => h(QJsonTreeNodeHeader, c.hDefaultParams())
          ),
          h(
            QCardSection,
            {
              class: 'q-pa-none q-ma-none',
            },
            () => slots.default()
          ),
        ]
      );
  },
};
