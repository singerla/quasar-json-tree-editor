import { setupComponent, setupDefaults } from '../../index';
import { h } from 'vue';
import { QBtn, QList, QMenu } from 'quasar';
import QJsonTreeMenuItem from './ContainerMenuItem';

export default {
  name: 'ContainerMenu',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    const doAdd = () => {
      c.addItem();
    };

    const doTruncate = () => {
      c.truncateList();
    };

    const doDelete = () => {
      c.deleteItem();
    };

    return () =>
      h(
        QBtn,
        {
          flat: true,
          dense: true,
          icon: 'more_vert',
          onClick: (e) => {
            e.stopPropagation();
          },
        },
        () =>
          h(QMenu, () =>
            h(
              QList,
              {
                dense: true,
                style: 'min-width: 100px',
              },
              () => [
                h(QJsonTreeMenuItem, {
                  label: 'Add',
                  onClick: doAdd,
                }),
                h(QJsonTreeMenuItem, {
                  label: 'Truncate',
                  onClick: doTruncate,
                }),
                h(QJsonTreeMenuItem, {
                  label: 'Delete',
                  onClick: doDelete,
                }),
              ]
            )
          )
      );
  },
};
