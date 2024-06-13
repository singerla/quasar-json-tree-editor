import { setupDefaults, vd } from '../index';
import { h, resolveDirective } from 'vue';
import { QBtn, QItem, QItemSection, QList, QMenu } from 'quasar';

export default {
  name: 'QJsonTreeMenuItem',
  props: [...setupDefaults.props, 'label'],
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    return () =>
      h(
        QItem,
        {
          clickable: true,
          disable: false,
          onClick: () => {
            emit('add');
          },
        },
        () =>
          h(
            QItemSection,
            {
              avatar: true,
            },
            () => props.label
          )
      );
  },
};
