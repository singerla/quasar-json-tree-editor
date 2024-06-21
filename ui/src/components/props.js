export const propsFactory = (c, emit, props, addProps) => {
  const defaultProps = {
    hasModel: true,
    updatesModel: true,
    emitsUpdated: true,
    initsUpdated: false,
    hasIndexedModel: false,
    updatesIndexedModel: false,
  };

  let retProps = {
    schema: props.schema,
    propKey: props.propKey,
    type: props.type,
    path: props.path,
  };

  addProps = addProps || {};
  Object.keys(defaultProps).forEach((defaultProp) => {
    if (
      defaultProps[defaultProp] === true &&
      addProps[defaultProp] === undefined
    ) {
      addProps[defaultProp] = true;
    }
  });

  if (addProps.initsUpdated === true) {
    addProps.emitsUpdated = false;
    addProps.updatesModel = false;
  }

  let index = c.getIndex();
  if (addProps.hasIndexedModel === true) {
    addProps.hasModel = false;
    if (addProps.updatesModel === true) {
      addProps.updatesModel = false;
      addProps.updatesIndexedModel = true;
    }
    index = addProps.index;
  }

  addProps = addProps || defaultProps;

  const hasModel = {
    modelValue: props.modelValue,
  };
  const hasIndexedModel = {
    modelValue: props.modelValue[index],
  };
  const updatesModel = {
    'onUpdate:modelValue': (val) => {
      emit('update:modelValue', val);
    },
  };
  const updatesIndexedModel = {
    'onUpdate:modelValue': (val) => {
      props.modelValue[index] = val;
    },
  };
  const initsUpdated = {
    'onUpdate:modelValue': (newValue) => {
      c.initUpdated(newValue, index);
      emit('update:modelValue', newValue);
    },
  };
  const emitsUpdated = {
    onUpdated: c.emitUpdated,
  };

  if (addProps.hasModel) {
    retProps = Object.assign(retProps, hasModel);
  }
  if (addProps.updatesModel) {
    retProps = Object.assign(retProps, updatesModel);
  }
  if (addProps.initsUpdated) {
    retProps = Object.assign(retProps, initsUpdated);
  }
  if (addProps.emitsUpdated) {
    retProps = Object.assign(retProps, emitsUpdated);
  }
  if (addProps.hasIndexedModel) {
    retProps = Object.assign(retProps, hasIndexedModel);
  }
  if (addProps.updatesIndexedModel) {
    retProps = Object.assign(retProps, updatesIndexedModel);
  }

  Object.keys(addProps).forEach((addProp) => {
    if (defaultProps[addProp] === undefined) {
      retProps[addProp] = addProps[addProp];
    }
  });

  return retProps;
};
