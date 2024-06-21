export const propsFactory = (c, emit, props, addProps) => {
  const defaultProps = {
    hasModel: true,
    updatesModel: true,
    emitsUpdated: true,
    initsUpdated: false,
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

  const emitUpdated = (newValue) => {
    const oldValue = c.getData();
    emit('updated', {
      path: [c.initPath()],
      index: c.getIndex(),
      key: c.getKey(),
      oldValue: oldValue,
      newValue: newValue,
    });
  };

  addProps = addProps || defaultProps;

  let retProps = {
    schema: props.schema,
    propKey: props.propKey,
    type: props.type,
    path: props.path,
  };

  const hasModel = {
    modelValue: props.modelValue,
  };
  const updatesModel = {
    'onUpdate:modelValue': (val) => {
      emit('update:modelValue', val);
    },
  };
  const initsUpdated = {
    'onUpdate:modelValue': (newValue) => {
      emitUpdated(newValue);
      emit('update:modelValue', newValue);
    },
  };
  const emitsUpdated = {
    onUpdated: (val) => {
      if (val.path === undefined) {
        val.path = [c.initPath()];
      } else {
        val.path.push(c.initPath());
      }
      emit('updated', val);
    },
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

  Object.keys(addProps).forEach((addProp) => {
    if (defaultProps[addProp] === undefined) {
      retProps[addProp] = addProps[addProp];
    }
  });

  return retProps;
};
