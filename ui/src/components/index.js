import { propsFactory } from './props';

export const vd = (val) => {
  console.log(val);
};

export const setupDefaults = {
  props: ['modelValue', 'propKey', 'schema', 'index', 'type', 'class', 'path'],
  emits: ['update:modelValue', 'updated', 'initsUpdated'],
};

export const setupComponent = (props, emit) => {
  const c = {
    getData: (index) => {
      if (index !== undefined) {
        return props.modelValue[index];
      }
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
      return { key: c.getKey(), type: c.getType(), index: c.getIndex() };
    },
    addItem: () => {
      if (c.hasProperties()) {
        return;
      }
      const addData = getInitialValue(props.modelValue, props.schema);
      props.modelValue.push(addData);
      emit('update:modelValue', props.modelValue);
    },
    truncateList: () => {
      if (c.hasProperties()) {
        Object.keys(c.getData()).forEach((unsetKey) => {
          props.modelValue[unsetKey] = undefined;
        });
      } else {
        emit('update:modelValue', []);
      }
    },
    createProperty: () => {
      const addData = getInitialValue(props.modelValue, {
        items: props.schema,
      });
      const key = c.getKey();
      props.modelValue[key] = addData[key];
    },
    initUpdated: (newValue, index, oldValue) => {
      emit('updated', {
        path: [c.initPath()],
        key: c.getKey(),
        oldValue: oldValue !== undefined ? oldValue : c.getData(),
        newValue: newValue,
        index,
      });
    },
    emitUpdated: (val) => {
      emit('updated', val);
    },
    emitUpdatedAndPush: (val) => {
      val.path.push(c.initPath());
      emit('updated', val);
    },
    props: (addProps) => propsFactory(c, emit, props, addProps),
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
    return getInitialValueByType(schema.items);
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
