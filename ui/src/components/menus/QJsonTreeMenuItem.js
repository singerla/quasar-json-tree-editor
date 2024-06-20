import { h } from 'vue';
import { QItem, QItemSection } from 'quasar';

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
