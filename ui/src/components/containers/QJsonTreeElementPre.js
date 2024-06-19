import { h } from 'vue';
import {
  hDefParams,
  hParams,
  hScalarParams,
  setupDefaults,
  vd,
} from '../index';
import QJsonTreeFieldPre from './QJsonTreeFieldPre';
import QJsonTreeNodePre from './QJsonTreeNodePre';

export default {
  name: 'QJsonTreeElementPre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    vd('setup QJsonTreeElementPre');
    if (props.schema.properties) {
      return () =>
        h(QJsonTreeNodePre, hDefParams(props, emit, 'element property'));
    } else if (props.schema.type === 'array') {
      if (props.schema.items.type === 'array') {
        return () =>
          props.modelValue.map((item, index) => {
            return h(
              QJsonTreeNodePre,
              hParams(props, emit, index, 'array of arrays')
            );
          });
      } else if (props.schema.items.type === 'object') {
        return () =>
          props.modelValue.map((item, index) => {
            return h(
              QJsonTreeNodePre,
              hParams(props, emit, index, 'array of objects')
            );
          });
      } else {
        return () =>
          props.modelValue.map((item, index) => {
            return h(
              QJsonTreeFieldPre,
              hParams(props, emit, index, 'array of scalars', {
                updateModelValue: true,
              })
            );
          });
      }
    } else {
      return () => h(QJsonTreeFieldPre, hScalarParams(props, emit, 'scalar'));
    }
  },
};
