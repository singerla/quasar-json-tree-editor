import { h } from 'vue';
import {QIcon, QItem, QItemLabel, QItemSection} from 'quasar';

export default {
  name: 'ContainerMenuItem',
  props: ['label', 'icon'],
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
        () => [
          h(
            QItemSection,
            {
              avatar: true,
            },
            () =>
              h(QIcon, {
                name: props.icon,
              })
          ),
          h(
            QItemSection,
            {
            },
            () => h(
              QItemLabel,
              {
              },
              () => props.label
            )
          ),
        ]
      );
  },
};
