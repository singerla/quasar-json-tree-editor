import { h } from 'vue';
import {setupComponent, setupDefaults, vd} from '../index';
import QJsonTreeNodeDivision from "../containers/QJsonTreeNodeDivision";
import QJsonTreeNodeExpansion from "../containers/QJsonTreeNodeExpansion";
import QJsonTreeNodeCard from "../containers/QJsonTreeNodeCard";

export default {
  name: 'QJsonTreeContainerPre',
  props: setupDefaults.props,
  setup(props, { emit, slots }) {
    const c = setupComponent(props, emit);

    let component = QJsonTreeNodeDivision
    if(c.getSchemaParam('container') === 'Expansion') {
      component = QJsonTreeNodeExpansion
    } else if(c.getSchemaParam('container') === 'Card') {
      component = QJsonTreeNodeCard
    }

    return () =>
      h(
        component,
        c.hDefaultParams('q-json-tree-node'),
        () => slots.default()
      );
  },
};
