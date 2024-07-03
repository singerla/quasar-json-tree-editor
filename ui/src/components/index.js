import { propsFactory } from './props';

export const vd = (val) => {
  console.log(val);
};

export const setupDefaults = {
  props: ['modelValue', 'propKey', 'schema', 'index', 'type', 'class', 'path'],
  emits: ['update:modelValue', 'updated'],
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
    dataHasLength: () => {
      return props.modelValue.length > 0;
    },
    getSchemaParam: (key, defVal) => {
      if (props.schema.params && props.schema.params[key]) {
        return props.schema.params[key];
      }
      return defVal;
    },
    getSchemaClass: (addClass) => {
      return c.getSchemaParam('class', '') + ' ' + addClass;
    },
    getClass: (addClass) => {
      return props.class + ' ' + addClass;
    },
    getLabel: () => {
      if (props.title) return props.title;
      return String(props.propKey);
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
      return isObject(props.schema);
    },
    isArray: () => {
      return isArray(props.schema);
    },
    isNumeric: () => {
      return isNumeric(props.schema);
    },
    isBoolean: () => {
      return isBoolean(props.schema);
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
    getPath: () => props.path,
    getPathString: () => props.path.join(' > '),
    addItem: () => {
      if (c.hasProperties()) {
        return;
      }
      const addData = getInitialValue(props.schema);
      props.modelValue.push(addData);
      c.defaultUpdate()(props.modelValue);
    },
    truncateList: () => {
      if (c.hasProperties()) {
        Object.keys(c.getData()).forEach((unsetKey) => {
          c.indexedUpdate({ index: unsetKey, emitsUpdated: true })({
            __action: 'delete',
          });
        });
      } else {
        c.defaultUpdate()([]);
      }
    },
    createProperty: () => {
      const addData = getInitialValue({
        items: props.schema,
      });
      const key = c.getKey();
      c.indexedUpdate({ index: key, emitsUpdated: true })(addData[key]);
    },
    deleteItem: () => {
      c.defaultUpdate()({
        __action: 'delete',
      });
    },
    copyItem: (atIndex) => {
      c.defaultUpdate()({
        __action: 'copy',
        atIndex,
      });
    },
    formatValueByType: (val) => {
      if (c.isNumeric()) {
        return Number(val);
      }
      return val;
    },
    emitOnce: (info) => {
      if (info.newValue !== info.oldValue) {
        emit('updated', info);
      }
    },
    propsParams: (addProps) => {
      addProps = addProps || {
        index: 0,
      };
      const index = addProps.index;
      return {
        hasModel: {
          modelValue: props.modelValue,
        },
        hasIndexedModel: {
          modelValue: props.modelValue[index],
        },
        updatesModel: {
          'onUpdate:modelValue': (val) => {
            emit('update:modelValue', c.formatValueByType(val));
          },
        },
        updatesIndexedModel: {
          'onUpdate:modelValue': (val) => {
            c.emitOnce({
              newValue: val,
              oldValue: props.modelValue[index],
              atKey: c.getKey(),
              atIndex: index,
              path: c.getPath(),
            });

            if (val.__action) {
              if (Array.isArray(props.modelValue)) {
                const data = c.performArrayAction(val.__action, index, val);
                emit('update:modelValue', data);
              } else if (typeof props.modelValue === 'object') {
                c.performObjectAction(val.__action, index);
                emit('update:modelValue', props.modelValue);
              }
            } else {
              props.modelValue[index] = val;
              emit('update:modelValue', props.modelValue);
            }
          },
        },
        emitsUpdated: {
          onUpdated: (val) => {
            emit('updated', val);
          },
        },
      };
    },
    performObjectAction: (action, index, val) => {
      if (action === 'delete') {
        props.modelValue[index] = undefined;
        return;
      }
      console.error("Can't perform this action on objects");
      console.error(val);
    },
    performArrayAction: (action, index, val) => {
      let data = [...props.modelValue];

      if (action === 'copy') {
        if (val.atIndex !== undefined) {
          data.splice(val.atIndex, 0, props.modelValue[index]);
        } else {
          data.push(props.modelValue[index]);
        }
        return data;
      } else if (action === 'delete') {
        return data.filter((val, id) => id !== index);
      }
      console.error("Can't perform this action on arrays");
      console.error(val);
      return data;
    },
    props: (addProps) => propsFactory(c, emit, props, addProps),
    indexedUpdate: (addProps) =>
      c.propsParams(addProps).updatesIndexedModel['onUpdate:modelValue'],
    defaultUpdate: () => c.propsParams().updatesModel['onUpdate:modelValue'],
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

export const getInitialValue = (schema) => {
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
