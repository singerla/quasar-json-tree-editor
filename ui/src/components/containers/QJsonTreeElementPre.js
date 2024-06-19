import { h } from 'vue';
import { setupDefaults, vd } from '../index';
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
        h(QJsonTreeNodePre, {
          modelValue: props.modelValue,
          schema: props.schema,
          propKey: props.propKey,
          type: 'element has properties',
        });
    } else if (props.schema.type === 'array') {
      if (props.schema.items.type === 'array') {
        return () =>
          props.modelValue.map((item, index) => {
            return h(QJsonTreeNodePre, {
              key: index,
              modelValue: props.modelValue[index],
              onUpdated: (val) => {
                val.path.push({
                  key: props.propKey,
                  type: 'array of arrays',
                  index: index,
                });
                emit('updated', val);
              },
              schema: props.schema.items,
              propKey: props.propKey + '_' + index,
              index: index,
              type: 'array of arrays',
            });
          });
      } else if (props.schema.items.type === 'object') {
        return () =>
          props.modelValue.map((item, index) => {
            return h(QJsonTreeNodePre, {
              key: index,
              modelValue: props.modelValue[index],
              onUpdated: (val) => {
                val.path.push({
                  key: props.propKey,
                  type: 'array of objects',
                  index: index,
                });
                emit('updated', val);
              },
              schema: props.schema.items,
              propKey: props.propKey + '_' + index,
              index: index,
              type: 'array of objects',
            });
          });
      } else {
        return () =>
          props.modelValue.map((item, index) => {
            return h(
              QJsonTreeFieldPre,
              {
                key: index,
                modelValue: props.modelValue[index],
                'onUpdate:modelValue': (val) => {
                  props.modelValue[index] = val;
                },
                onUpdated: (val) => {
                  val.path.push({
                    key: props.propKey,
                    type: 'array of scalars',
                    index: index,
                  });
                  emit('updated', val);
                },
                schema: props.schema.items,
                propKey: props.propKey + '_' + index,
                index: index,
                type: 'array of scalars',
              },
              null
            );
          });
      }
    } else {
      return () =>
        h(QJsonTreeFieldPre, {
          modelValue: props.modelValue,
          'onUpdate:modelValue': (val) => {
            emit('update:modelValue', val);
          },
          onUpdated: (val) => {
            val.path.push({
              key: props.propKey,
              type: 'element is scalar',
              index: props.index,
            });
            emit('updated', val);
          },
          schema: props.schema,
          propKey: props.propKey,
          type: 'element is scalar',
        });
    }
  },
};
