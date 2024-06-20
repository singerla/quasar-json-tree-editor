import { h } from 'vue';
import { hParams, setupDefaults, vd } from '../index';
import QJsonTreeElementPre from './QJsonTreeElementPre';

export default {
  name: 'QJsonTreeNodePre',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    if (props.schema.type === 'object') {
      const properties = Object.keys(props.schema.properties);
      return () =>
        properties.map((propKey) => {
          if (
            props.modelValue === undefined ||
            props.modelValue[propKey] === undefined
          ) {
            return h('div', 'add button ' + propKey);
          }

          if (props.modelValue[propKey]) {
            return h(
              QJsonTreeElementPre,
              hParams(props, emit, propKey, 'element from object prop', {
                updateModelValue: true,
                onUpdatedPush: false,
                schemaFromProperties: true,
              })
            );
          }
        });
    } else if (props.schema.type === 'array') {
      return () =>
        props.modelValue.map((item, index) => {
          return h(
            QJsonTreeElementPre,
            hParams(props, emit, index, 'element from array', {
              updateModelValue: true,
              onUpdatedPush: false,
            })
          );
        });
    }

    console.error('unhandled schema type');
    console.error(props);
  },
};
