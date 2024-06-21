import { computed } from 'vue';

export const vd = (val) => {
  console.log(val);
};

export const setupDefaults = {
  props: ['modelValue', 'propKey', 'schema', 'index', 'type', 'class'],
  emits: ['update:modelValue', 'updated'],
};

export const setupComponent = (props, emit) => {
  const c = {
    getData: () => {
      return props.modelValue;
    },
    getKey: () => {
      return props.propKey;
    },
    getType: () => {
      return props.type;
    },
    getSchema: () => {
      return props.schema;
    },
    getIndex: () => {
      return props.index || 0;
    },
    dataHasProperty: (propKey) => {
      return (
        props.modelValue !== undefined &&
        props.modelValue[propKey] !== undefined
      );
    },
    getSchemaParam: (key, defaultValue) => {
      if (props.schema.params && props.schema.params[key]) {
        return props.schema.params[key];
      }
      return defaultValue;
    },
    getClass: (addClass) => {
      return props.class + ' ' + addClass;
    },
    getLabel: () => {
      return String(
        props.label ||
          (props.index !== undefined ? ' #' + (props.index + 1) : props.propKey)
      );
    },
    getUniqueKey: (item, index) => {
      const key = [props.propKey];
      if (typeof item === 'string' || typeof item === 'number') {
        key.push(index);
      } else {
        const idProp = c.getSchemaParam('idPropName', 'id');
        if (item[idProp] !== undefined) {
          key.push(item[idProp]);
        } else {
          key.push(index);
        }
      }
      return key.join('_');
    },
    isObject: () => {
      return props.schema.type === 'object';
    },
    isArray: () => {
      return props.schema.type === 'array';
    },
    childIsArray: () => {
      return props.schema.items.type === 'array';
    },
    childIsObject: () => {
      return props.schema.items.type === 'object';
    },
    hasProperties: () => {
      return props.schema.properties !== undefined;
    },
    getProperties: () => {
      return Object.keys(props.schema.properties);
    },
    initPath: () => {
      return { key: c.getKey(), type: c.getType() };
    },
    addItem: () => {
      if (c.hasProperties()) {
        return;
      }
      const addData = getInitialValue(props.modelValue, props.schema);
      props.modelValue.push(addData);
      emit('updated', {
        path: [c.initPath()],
        added: true,
        newValue: addData,
      });
    },
    truncateList: () => {
      if (c.hasProperties()) {
        Object.keys(c.getData()).forEach(unsetKey => {
          props.modelValue[unsetKey] = undefined
        })
      } else {
        emit('update:modelValue', []);
      }

      emit('updated', {
        path: [c.initPath()],
        truncated: true,
        newValue: [],
      });
    },
    createProperty: () => {
      const addData = getInitialValue(props.modelValue, {
        items: props.schema,
      });
      const key = c.getKey();
      props.modelValue[key] = addData[key];
      emit('updated', {
        path: [c.initPath()],
        added: true,
        newValue: addData,
      });
    },
    hParamsFactory: {
      onUpdated: (val) => {
        emit('updated', val);
      },
    },
    hProps: (addClass) => {
      return {
        modelValue: props.modelValue,
        schema: props.schema,
        propKey: props.propKey,
        type: props.type,
        class: addClass,
      };
    },
    hDefaultParams: (addClass) => {
      return {
        modelValue: props.modelValue,
        onUpdated: c.hParamsFactory.onUpdated,
        schema: props.schema,
        propKey: props.propKey,
        type: props.type,
        class: addClass,
      };
    },
    hSortableParams: (addClass) => {
      return {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (val) => {
          emit('update:modelValue', val);
        },
        onUpdated: c.hParamsFactory.onUpdated,
        schema: props.schema,
        propKey: props.propKey,
        type: props.type,
        class: addClass,
      };
    },
    hPropParams: (type) => {
      return {
        modelValue: props.modelValue,
        onUpdated: (val) => {
          val.path.push({
            key: props.propKey,
            type: type,
          });
          emit('updated', val);
        },
        schema: props.schema,
        propKey: props.propKey,
        type: type,
      };
    },
    hParams: (index, type, add) => {
      const params = {
        key: index,
        modelValue: props.modelValue[index],
        onUpdated: (val) => {
          if (!add || add.onUpdatedPush !== false) {
            val.path.push({
              key: props.propKey,
              type: type,
              index: index,
            });
          }
          emit('updated', val);
        },
        schema: props.schema.items,
        propKey: index,
        index: index,
        type: type,
      };

      if (add) {
        if (add.updateModelValue) {
          params['onUpdate:modelValue'] = (val) => {
            props.modelValue[index] = val;
          };
        }

        if (add.schemaFromProperties) {
          params.schema = props.schema.properties[index];
        }
      }
      return params;
    },
    hScalarParams: (type) => {
      return {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (val) => {
          emit('update:modelValue', val);
        },
        onUpdated: (val) => {
          val.path.push({
            key: props.propKey,
            type: type,
            index: props.index,
          });
          emit('updated', val);
        },
        schema: props.schema,
        propKey: props.propKey,
        type: type,
      };
    },
  };
  return c;
};

const scalarTypes = ['integer', 'number', 'string', 'boolean'];
const stringTypes = ['string'];
const numericTypes = ['integer', 'number'];

export const isScalar = (schema) => scalarTypes.includes(schema.type);
export const isNumeric = (schema) => numericTypes.includes(schema.type);
export const isString = (schema) => stringTypes.includes(schema.type);
export const isObject = (schema) => schema.type === 'object';
export const isArray = (schema) => schema.type === 'array';
export const isBoolean = (schema) => schema.type === 'boolean';

export const getInitialValue = (modelValue, schema) => {
  if (isObject(schema.items)) {
    const addData = {};
    const addKeys = Object.keys(schema.items.properties);
    addKeys.forEach((addKey) => {
      const childSchema = schema.items.properties[addKey];
      addData[addKey] = getInitialValueByType(childSchema);
    });
    return addData;
  } else {
    const iniValue = getInitialValueByType(schema.items);
    return iniValue;
  }
};

const getInitialValueByType = (schema) => {
  if (isObject(schema)) {
    return {};
  } else if (isArray(schema)) {
    return [];
  } else if (isBoolean(schema)) {
    return false;
  } else if (isNumeric(schema)) {
    return 0;
  } else if (isString(schema)) {
    return '';
  } else {
    return null;
  }
};

export const valueBySchema = (value, localSchema) => {
  if (isNumeric(localSchema).value) {
    value = Number(value);
  }
  return value;
};
