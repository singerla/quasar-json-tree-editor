import { setupComponent, setupDefaults, vd } from '../index';
import { h } from 'vue';
import QJsonTreeElement from './QJsonTreeElement';
import { QCard, QCardSection, QIcon } from 'quasar';
import QJsonTreeMenu from '../menus/QJsonTreeMenu';
import QJsonTreeHeader from './headers/QJsonTreeHeader.vue';
import QJsonTreeNodeHeader from './headers/QJsonTreeNodeHeader';

export default {
  name: 'QJsonTreeNodeCard',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const hProps = setupComponent(props, emit).hProps({});
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
            () => h(QJsonTreeNodeHeader, hProps)
          ),
          h(
            QCardSection,
            {
              class: 'q-pa-none q-ma-none',
            },
            () => h(QJsonTreeElement, hProps)
          ),
        ]
      );
  },
};
