import {
  isArray,
  isObject,
  isScalar,
  setupDefaults,
  setupComponent,
  vd,
} from '../index';
import { h, toRef } from 'vue';
import QJsonTreeEditorField from '../fields/QJsonTreeEditorField';
import QJsonTreeEditorObject from '../lists/QJsonTreeEditorObject';
import QJsonTreeEditorArray from '../lists/QJsonTreeEditorArray';

export default {
  name: 'QJsonTreeElement',
  props: setupDefaults.props,
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const component = setupComponent(props, emit);
    const hProps = component.hProps({});

    let componentIs;
    if (component.is('scalar')) {
      componentIs = QJsonTreeEditorField;
    } else if (component.is('object')) {
      componentIs = QJsonTreeEditorObject;
    } else if (component.is('array')) {
      componentIs = QJsonTreeEditorArray;
    }

    return () => h(componentIs, hProps);
  },
};
