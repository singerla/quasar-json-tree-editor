import { vd } from './index';

export const propsFactory = (c, emit, props, addProps) => {
  const defaultProps = {
    hasModel: true,
    updatesModel: true,
    emitsUpdated: true,
    hasIndexedModel: false,
    updatesIndexedModel: false,
  };

  let retProps = {
    schema: props.schema,
    propKey: props.propKey,
    type: props.type,
    path: props.path,
  };

  retProps.path = [...retProps.path];
  if (retProps.path[retProps.path.length - 1] !== props.propKey) {
    retProps.path.push(props.propKey);
  }

  addProps = addProps || {};
  Object.keys(defaultProps).forEach((defaultProp) => {
    if (
      defaultProps[defaultProp] === true &&
      addProps[defaultProp] === undefined
    ) {
      addProps[defaultProp] = true;
    }
  });

  let index = c.getIndex();
  if (addProps.hasIndexedModel === true) {
    addProps.hasModel = false;
    if (addProps.updatesModel === true) {
      addProps.updatesModel = false;
      addProps.updatesIndexedModel = true;
    }
    index = addProps.index;
  }

  const propsParams = c.propsParams(index, retProps);
  Object.keys(addProps).forEach((addProp) => {
    if (addProps[addProp]) {
      retProps = Object.assign(retProps, propsParams[addProp]);
    }

    if (defaultProps[addProp] === undefined) {
      retProps[addProp] = addProps[addProp];
    }
  });

  return retProps;
};
