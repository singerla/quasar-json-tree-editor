import {computed, h, ref} from 'vue';
import { setupComponent, setupDefaults, vd } from '../index';
import QJsonTreeElementPre from './QJsonTreeElementPre';
import { QList } from 'quasar';
import {useDraggable} from "vue-draggable-plus";

export default {
  name: 'QJsonTreeNodeArrayPre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    return () =>
      c.getData().map((item, index) => {
        return h(
          QJsonTreeElementPre,
          c.hParams(index, 'element from array', {
            updateModelValue: true,
            onUpdatedPush: false,
          })
        );
      });
  },
};
