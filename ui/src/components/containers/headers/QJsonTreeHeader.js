import { h } from 'vue';
import { QChip, QItem, QItemLabel, QItemSection } from 'quasar';
import {setupDefaults} from "../../index";

export default {
  name: 'QJsonTreeHeader',
  props: [...setupDefaults.props, 'showType', 'showKey'],
  emits: setupDefaults.emits,
  setup(props, { slots }) {
    return () =>
      h(
        QItem,
        {
          class: 'q-json-tree-header full-width q-pa-none q-ma-none',
        },
        () => [
          h(QItemSection, { avatar: true }, () => slots.icon()),
          h(QItemSection, () => [
            h(QItemLabel, { caption: true }, props.propkey),
          ]),
          h(QItemSection, { side: true }, () =>
            h(QChip, {
              label: props.schema?.type,
              color: 'grey-6',
            })
          ),
          h(QItemSection, { side: true }, () =>
            h(QChip, {
              label: 'of ' + props.schema?.items?.type + 's',
              color: 'grey-6',
            })
          ),
          h(QItemSection, { avatar: true }, () => slots.menu()),
        ]
      );
  },
};
