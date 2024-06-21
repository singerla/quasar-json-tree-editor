import { h } from 'vue';
import {setupComponent, vd} from '../index';
import {QBanner} from "quasar";

export default {
  name: 'QJsonTreeMessage',
  props: ['class'],
  setup(props) {
    console.error('Could not render element properly.')
    console.error(props.schema)
    console.error(props.modelValue)
    return () =>
      h(
        QBanner,
        {
        },
        'Could not render element properly.'
      );
  },
};
