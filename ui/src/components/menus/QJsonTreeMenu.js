import { setupDefaults, vd } from '../index';
import { h } from 'vue';
import { QBtn, QList, QMenu } from 'quasar';
import QJsonTreeMenuItem from './QJsonTreeMenuItem';

export default {
  name: 'QJsonTreeMenu',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    return () =>
      h(
        QBtn,
        {
          flat: true,
          dense: true,
          icon: 'more_vert',
        },
        () =>
          h(QMenu, () =>
            h(
              QList,
              {
                dense: true,
                style: 'min-width: 100px',
              },
              () =>
                h(QJsonTreeMenuItem, {
                  label: 'Add',
                  onAdd: (value) => {
                    emit('add', value);
                  },
                })
            )
          )
      );
  },
};
