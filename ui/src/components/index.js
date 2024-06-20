import { computed, toRef } from 'vue';

export const vd = (val) => {
  console.log(val);
};

export const valueBySchema = (value, localSchema) => {
  if (isNumeric(localSchema).value) {
    value = Number(value);
  }
  return value;
};

export const setupDefaults = {
  props: ['modelValue', 'propKey', 'schema', 'index', 'type', 'class'],
  emits: ['update:modelValue', 'updated'],
};

export const setupComponent = (props, emit) => {
  return {
    getData: () => {
      return props.modelValue;
    },
    getKey: () => {
      return props.propKey;
    },
    getType: () => {
      return props.type;
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
    getSchemaParam: (key) => {
      if (props.schema.params && props.schema.params[key]) {
        return props.schema.params[key];
      }
    },
    getClass: (addClass) => {
      return props.class + ' ' + addClass;
    },
    getLabel: () => {
      return props.label || (props.index !== undefined ? ' #' + (props.index + 1) : props.propKey);
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
    hDefaultParams: (addClass) => {
      return {
        modelValue: props.modelValue,
        onUpdated: (val) => {
          emit('updated', val);
        },
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
        onUpdated: (val) => {
          emit('updated', val);
        },
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
};

const scalarTypes = ['integer', 'number', 'string', 'boolean'];
const numericTypes = ['integer', 'number'];
const objectTypes = ['object', 'array'];

export const isScalar = (schema) =>
  computed(() => scalarTypes.includes(schema.type));
export const isNumeric = (schema) =>
  computed(() => numericTypes.includes(schema.type));
export const hasChildren = (schema) =>
  computed(() => objectTypes.includes(schema.type));
export const isObject = (schema) => computed(() => schema.type === 'object');
export const isArray = (schema) => computed(() => schema.type === 'array');
export const isBoolean = (schema) => computed(() => schema.type === 'boolean');

export const addItemToArray = (localData, localSchema) => {
  if (isObject(localSchema.items).value) {
    const addData = {};
    const addKeys = Object.keys(localSchema.items.properties);
    addKeys.forEach((addKey) => {
      const childSchema = localSchema.items.properties[addKey];
      if (isObject(childSchema).value) {
        addData[addKey] = {};
      } else if (isArray(childSchema).value) {
        addData[addKey] = [];
      } else if (isBoolean(childSchema).value) {
        addData[addKey] = false;
      } else if (isNumeric(childSchema).value) {
        addData[addKey] = 0;
      } else {
        addData[addKey] = null;
      }
    });
    localData.push(addData);
  } else if (isArray(localSchema.items).value) {
    localData.push([]);
  } else if (isNumeric(localSchema.items).value) {
    localData.push(0);
  } else if (isBoolean(localSchema.items).value) {
    localData.push(false);
  } else {
    localData.push('');
  }
};

export const createObjectProperty = (localData, localSchema) => () => {
  if (isBoolean(localSchema.value).value) {
    localData.value = false;
  } else if (isNumeric(localSchema.value).value) {
    localData.value = 0;
  } else if (isObject(localSchema.value).value) {
    localData.value = {};
  } else if (isArray(localSchema.value).value) {
    localData.value = [];
  } else {
    localData.value = '';
  }
};

export const clearItemByType = (localData, localSchema) => {
  return () => {
    if (isObject(localSchema.value).value) {
      localData.value = {};
    } else if (isArray(localSchema.value).value) {
      localData.value = [];
    } else if (isNumeric(localSchema.value).value) {
      localData.value = 0;
    } else {
      localData.value = '';
    }
  };
};
