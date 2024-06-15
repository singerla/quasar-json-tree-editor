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
  props: ['modelValue', 'schema', 'parentSchema', 'propKey'],
  emits: ['update:modelValue', 'updated', 'add', 'clear', 'drop'],
  local: (props, emits) => {
    return {
      localData: computedLocalData(props, emits),
      localSchema: toRef(props, 'schema'),
      propKey: toRef(props, 'propKey'),
      parentSchema: toRef(props, 'parentSchema'),
      updated: (data) => {
        emits('updated', data);
      },
    };
  },
};

export const setupComponent = (props, emit, onBeforeUpdate, onAfterUpdate) => {
  let localData = computedLocalData(props, emit, onBeforeUpdate, onAfterUpdate);
  const localSchema = toRef(props, 'schema');
  const propKey = toRef(props, 'propKey');
  const parentSchema = toRef(props, 'parentSchema');

  return {
    props: setupDefaults.props,
    emits: setupDefaults.emits,
    propKey,
    localSchema,
    parentSchema,
    getLocalData: (defaultValue) => localData.value || defaultValue,
    setLocalData: (newValue) => (localData.value = newValue),
    getSchemaParam: (key, defaultValue) => {
      if (localSchema.value.params && localSchema.value.params[key]) {
        return localSchema.value.params[key];
      }
      return defaultValue;
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
    hProps: (hProps) => {
      localData = hProps.localData ? hProps.localData : localData;
      const defaultEmit = (key) => {
        return hProps[key] ? hProps[key] : (data) => emit(key, data);
      };
      const modelKey = hProps.modelKey;
      const defaultValue =
        modelKey !== undefined && localData.value
          ? localData.value[modelKey]
          : localData.value;

      const defaultUpdate = (value) => {
        if (modelKey !== undefined) {
          localData.value = localData.value || {};
          localData.value[modelKey] = value;
        } else {
          localData.value = value;
        }
      };

      const addProps = hProps.addProps !== undefined ? hProps.addProps : {};

      return {
        modelValue: defaultValue,
        'onUpdate:modelValue': hProps.update ? hProps.update : defaultUpdate,
        propKey: hProps.propKey ? hProps.propKey : propKey.value,
        schema: hProps.schema || localSchema.value,
        parentSchema: hProps.parentSchema || parentSchema.value,
        onUpdated: defaultEmit('updated'),
        onAdd: defaultEmit('add'),
        onClear: defaultEmit('clear'),
        onDrop: defaultEmit('drop'),
        ...addProps,
      };
    },
  };
};

export const computedLocalData = (
  props,
  emit,
  onBeforeSetCallback,
  onAfterSetCallback
) => {
  const localSchema = toRef(props, 'schema');
  const propKey = toRef(props, 'propKey');
  return computed({
    get: () => props.modelValue,
    set: (value) => {
      if (onBeforeSetCallback) {
        value = onBeforeSetCallback(value, localSchema, propKey);
      }
      emit('update:modelValue', value);
      if (onAfterSetCallback) {
        onAfterSetCallback(value, localSchema, propKey);
      }
    },
  });
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

export const addItemToArray = (localData, localSchema) => (val) => {
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

export const createObjectProperty =
  (localData, localSchema, localKey) => () => {
    if (isBoolean(localSchema.value).value) {
      localData.value[localKey.value] = false;
    } else if (isNumeric(localSchema.value).value) {
      localData.value[localKey.value] = 0;
    } else if (isObject(localSchema.value).value) {
      localData.value[localKey.value] = {};
    } else if (isArray(localSchema.value).value) {
      localData.value[localKey.value] = [];
    } else {
      localData.value[localKey.value] = '';
    }
  };
