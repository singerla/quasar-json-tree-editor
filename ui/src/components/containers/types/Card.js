import { setupComponent, setupDefaults } from '../../index';
import {h, inject} from 'vue';
import { QCard, QCardSection } from 'quasar';
import ContainerHeader from '../headers/ContainerHeader';

export default {
  name: 'Card',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit, slots }) {
    const c = setupComponent(props, emit);

    return () =>
      h(
        QCard,
        {
          class: c.getClass('q-json-tree-node-card'),
        },
        () => [
          h(
            QCardSection,
            {
              class: 'q-pa-none q-ma-none',
            },
            () => h(ContainerHeader, c.props({}))
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
