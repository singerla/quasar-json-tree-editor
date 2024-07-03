import { setupComponent, setupDefaults, vd } from '../../index';
import { h } from 'vue';
import {
  QBtn,
  QChip,
  QItem,
  QItemLabel,
  QItemSection,
  QList,
  QMenu,
  QSeparator,
  QSpace,
} from 'quasar';
import QJsonTreeMenuItem from './ContainerMenuItem';

export default {
  name: 'ContainerMenu',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    const params = c.getSchemaParam('menu', {
      sections: [
        'info',
        'add',
        'truncate',
        'delete',
        'copyInsert',
        'copyAppend',
        'space',
      ],
    });

    const availableSections = {
      space: () => h(QSeparator),
      info: () =>
        h(QItem, { class: 'bg-grey-2' }, () =>
          h(QItemSection, { class: 'q-pt-sm q-pb-sm' }, () => [
            h(QItemLabel, { title: true }, () => 'Menu'),
            h(QItemLabel, { caption: true }, () => c.getPathString()),
          ])
        ),
      add: () =>
        h(QJsonTreeMenuItem, {
          label: 'Add',
          icon: 'add',
          onClick: c.addItem,
        }),
      truncate: () =>
        h(QJsonTreeMenuItem, {
          label: 'Truncate',
          icon: 'delete_sweep',
          onClick: c.truncateList,
        }),
      delete: () =>
        h(QJsonTreeMenuItem, {
          label: 'Delete',
          icon: 'delete',
          onClick: c.deleteItem,
        }),
      copyInsert: () =>
        h(QJsonTreeMenuItem, {
          label: 'Copy & insert',
          icon: 'content_copy',
          onClick: () => c.copyItem(c.getIndex()),
        }),
      copyAppend: () =>
        h(QJsonTreeMenuItem, {
          label: 'Copy & append',
          icon: 'content_copy',
          onClick: () => c.copyItem(),
        }),
    };
    const sections = params.sections || [];

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
                class: 'q-json-tree-menu',
                style: 'min-width: 100px',
              },
              () => sections.map((section) => availableSections[section]())
            )
          )
      );
  },
};
