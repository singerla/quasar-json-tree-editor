import { computed } from 'vue';

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

const scalarTypes = ['integer', 'number', 'string'];
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
