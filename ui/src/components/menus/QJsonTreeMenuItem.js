import { setupDefaults, vd } from '../index';
import { h, resolveDirective } from 'vue';
import { QBtn, QItem, QItemSection, QList, QMenu } from 'quasar';

export default {
  name: 'QJsonTreeMenuItem',
  props: ['label'],
  emits: ['click'],
  setup(props, { emit }) {
    return () =>
      h(
        QItem,
        {
          clickable: true,
          disable: false,
          onClick: (e) => {
            e.stopPropagation();
            emit('click');
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
