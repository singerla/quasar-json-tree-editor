import {
  setupDefaults,
  setupComponent,
  vd,
  createObjectProperty,
} from '../index';
import { h } from 'vue';
import QJsonTreeElement from '../containers/QJsonTreeElement';
import { QBtn } from 'quasar';

export default {
  name: 'ButtonAddObjectProperty',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    // const component = setupComponent(props, emit);
    return () => [
      h(QBtn, {
        class: 'q-pa-sm q-ma-sm',
        color: 'primary',
        rounded: true,
        dense: true,
        noCaps: true,
        icon: 'add',
        label: props.propKey,
        // onClick: () => component.createProperty(),
      }),
    ];
  },
};
