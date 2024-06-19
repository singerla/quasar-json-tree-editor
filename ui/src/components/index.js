import { computed, toRef } from 'vue';

export const vd = (val) => {
  console.log(val);
};

export const getPropertyKey = (index, localSchema) =>
  Object.keys(localSchema.properties || {})[index];

export const valueBySchema = (value, localSchema) => {
  if (isNumeric(localSchema).value) {
    value = Number(value);
  }
  return value;
};

export const setupDefaults = {
  props: [
    'modelValue',
    'schema',
    'parentSchema',
    'propKey',
    'parentData',
  ],
  emits: ['update:modelValue', 'updated'],
};

export const setupComponent = (props, emit, type, onBeforeUpdate, onAfterUpdate) => {
  // vd('setupComponent: ' + type)

  const localSchema = toRef(props, 'schema');
  const propKey = toRef(props, 'propKey');
  const parentSchema = toRef(props, 'parentSchema');
  const parentData = toRef(props, 'parentData');

  return {
    props: setupDefaults.props,
    emits: setupDefaults.emits,
    propKey,
    localSchema,
    parentSchema,
    getLocalData: (defaultValue) => {
      return props.modelValue || defaultValue;
    },
    updateLocalData: (newData) => {
      emit('update:modelValue', newData);
    },
    getLocalSchema: () => localSchema.value,
    getParentSchema: () => parentSchema.value,
    getParentData: () => parentData.value,
    getSchemaParam: (key, defaultValue) => {
      if (localSchema.value.params && localSchema.value.params[key]) {
        return localSchema.value.params[key];
      }
      return defaultValue;
    },
    getProperties: () => {
      return Object.keys(localSchema.value.properties) || [];
    },
    hProps: () => {
      return {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => {
          emit('update:modelValue', value);
        },
        propKey: propKey.value,
        schema: localSchema.value,
        parentSchema: parentSchema.value,
        parentData: parentData,
        onUpdated: (data) => emit('updated', data),
      };
    },
    childHProps: (propKey) => {
      return {
        modelValue: computed(() => props.modelValue[propKey]),
        'onUpdate:modelValue': (val) => {
          const data = props.modelValue;
          data[propKey] = val;
          emit('update:modelValue', data);
        },
        propKey: propKey,
        schema: localSchema.value.properties[propKey],
        parentSchema: localSchema,
        parentData: parentData,
        onUpdated: (data) => emit('updated', data),
      };
    },
    itemHProps: (index) => {
      return {
        modelValue: computed(() => {
          return props.modelValue.value[index]
        }),
        'onUpdate:modelValue': (val) => {
          const data = props.modelValue.value;
          data[index] = val;
          emit('update:modelValue', data);
        },
        propKey: 'field_' + index,
        schema: localSchema.value.items,
        parentSchema: localSchema,
        parentData: parentData,
        onUpdated: (data) => emit('updated', data),
      };
    },
    is: (key) => {
      if (isScalar(localSchema.value).value && key === 'scalar') return true;
      if (isObject(localSchema.value).value && key === 'object') return true;
      if (isArray(localSchema.value).value && key === 'array') return true;
      if (isNumeric(localSchema.value).value && key === 'numeric') return true;
      if (isBoolean(localSchema.value).value && key === 'boolean') return true;
    },
    mapType: () => {
      if (isObject(localSchema.value).value) return 'object';
      if (isArray(localSchema.value).value) return 'array';
      if (isBoolean(localSchema.value).value) return 'boolean';
      if (isNumeric(localSchema.value).value) return 'numeric';
      if (isScalar(localSchema.value).value) return 'scalar';
      return 'default';
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

export const addItemByType = (localData, localSchema) => {
  const addToArray = addItemToArray(localData, localSchema);
  return () => {
    if (localSchema.value.type === 'array') {
      addToArray();
    }
  };
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
