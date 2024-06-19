import { h } from 'vue';
import { setupDefaults, vd } from '../index';
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
              {
                key: propKey,
                modelValue: props.modelValue[propKey],
                'onUpdate:modelValue': (val) => {
                  props.modelValue[propKey] = val;
                },
                onUpdated: (val) => {
                  emit('updated', val);
                },
                schema: props.schema.properties[propKey],
                propKey: propKey,
                type: 'key of object from node',
              },
              null
            );
          }
        });
    } else if (props.schema.type === 'array') {
      return () =>
        props.modelValue.map((item, index) => {
          return h(QJsonTreeElementPre, {
            modelValue: props.modelValue[index],
            'onUpdate:modelValue': (val) => {
              props.modelValue[index] = val;
            },
            onUpdated: (val) => {
              emit('updated', val);
            },
            schema: props.schema.items,
            propKey: props.propKey + '_' + index,
            index: index,
            type: 'item of array from node',
          });
        });
    }

    vd('unhandled schema type');
  },
};
