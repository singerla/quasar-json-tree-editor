import { computed, ref } from 'vue';

export const vd = (val) => {
  console.log(val);
};

export const getPropertyKey = (index, localSchema) =>
  Object.keys(localSchema?.properties || {})[index];

export const valueBySchema = (value, localSchema) => {
  if (isNumeric(localSchema).value) {
    value = Number(value);
  }
  return value;
};

export const computedLocalData = (
  props,
  emits,
  onBeforeSetCallback,
  onAfterSetCallback
) => {
  return computed({
    get: () => props.modelValue,
    set: (value) => {
      if (onBeforeSetCallback) {
        value = onBeforeSetCallback(value);
      }
      emits('update:modelValue', value);
      if (onAfterSetCallback) {
        onAfterSetCallback(value);
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
    if (localSchema.value.type === 'array') {
      localData.value = [];
    }
  };
};

export const addItemToArray = (localData, localSchema) => () => {
  if (isObject(localSchema.value.items).value) {
    const addData = {};
    const addKeys = Object.keys(localSchema.value.items.properties);
    addKeys.forEach((addKey) => {
      const childSchema = localSchema.value.items.properties[addKey];
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
    localData.value.push(addData);
  } else if (isArray(localSchema.value.items).value) {
    localData.value.push([]);
  } else if (isNumeric(localSchema.value.items).value) {
    localData.value.push(0);
  } else if (isBoolean(localSchema.value.items).value) {
    localData.value.push(false);
  } else {
    localData.value.push('');
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
