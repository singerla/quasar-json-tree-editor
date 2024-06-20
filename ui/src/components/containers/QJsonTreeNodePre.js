import { h } from 'vue';
import { setupComponent, setupDefaults } from '../index';
import QJsonTreeNodeObjectPre from './QJsonTreeNodeObjectPre';
import QJsonTreeNodeArrayPre from './QJsonTreeNodeArrayPre';
import QJsonTreeContainerPre from '../fields/QJsonTreeContainerPre';
import QJsonTreeMessage from "../fields/QJsonTreeMessage";

export default {
  name: 'QJsonTreeNodePre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    let component = QJsonTreeMessage;
    if (c.isObject()) {
      component = QJsonTreeNodeObjectPre;
    } else if (c.isArray()) {
      component = QJsonTreeNodeArrayPre;
    }

    return () =>
      h(QJsonTreeContainerPre, c.hDefaultParams('q-ml-md'), () =>
        h(component, c.hDefaultParams())
      );
  },
};
