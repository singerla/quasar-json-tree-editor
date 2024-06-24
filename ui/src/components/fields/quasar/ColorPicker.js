import { h, ref } from 'vue';
import { setupComponent, setupDefaults, vd } from '../../index';
import { QColor, QIcon, QInput, QPopupProxy } from 'quasar';

export default {
  name: 'ColorPicker',
  props: [...setupDefaults.props, 'label'],
  emits: setupDefaults.emits,
  setup(props, { emit }) {
    const c = setupComponent(props, emit);

    const doUpdate = (val) => {
      if (val !== c.getData()) {
        emit('update:modelValue', val);
      }
    };

    const popupProxy = ref(null);

    return () => [
      h(
        QInput,
        {
          label: c.getLabel(),
          class: 'q-json-tree-field-colorpicker',
          dense: true,
          readonly: true,
          onClick: () => popupProxy.value.show(),
          modelValue: c.getData(),
        },
        {
          prepend: () =>
            h('div', {
              style:
                'min-width: 20px; height: 20px; background-color: ' +
                c.getData(),
            }),
          append: () =>
            h(
              QIcon,
              {
                name: 'colorize',
                class: 'cursor-pointer',
              },
              () =>
                h(
                  QPopupProxy,
                  {
                    ref: popupProxy,
                    cover: true,
                  },
                  () =>
                    h(QColor, {
                      modelValue: c.getData(),
                      'onUpdate:modelValue': doUpdate,
                    })
                )
            ),
        }
      ),
    ];
  },
};
