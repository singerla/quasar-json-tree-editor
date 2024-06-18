import {addItemToArray, setupComponent, setupDefaults, vd} from '../index';
import { h } from 'vue';
import { QBtn, QList, QMenu } from 'quasar';
import QJsonTreeMenuItem from './QJsonTreeMenuItem';

export default {
  name: 'QJsonTreeMenu',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const component = setupComponent(props, emit);

    const doAdd = () => {
      const localSchema = component.getLocalSchema();
      const parentSchema = component.getParentSchema();

      if(component.is('scalar')) {
        addItemToArray(component.getParentData(), parentSchema)
      } else if(localSchema.type === 'array') {
        addItemToArray(component.getLocalData(), localSchema)
      }
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
              () =>
                h(QJsonTreeMenuItem, {
                  label: 'Add',
                  onClick: doAdd,
                })
            )
          )
      );
  },
};
