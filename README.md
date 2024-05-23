## This is an already usable work in progress.

<img src="https://img.shields.io/npm/v/quasar-ui-json-tree-editor.svg?label=quasar-ui-json-tree-editor">
<img src="https://img.shields.io/npm/v/quasar-app-extension-json-tree-editor.svg?label=quasar-app-extension-json-tree-editor">

Compatible with Quasar UI v2 and Vue 3.

# Structure

- [/ui](ui) - standalone npm package

- [/app-extension](app-extension) - Quasar app extension

# Try it
Clone repo, install dependencies, go to `/ui` directory and run `yarn dev`.
Choose `Test1` or `Test2`. Or even `Test3` or more!

# How it works
- Pass a JSON-Schema and a valid or empty object to the `<QJsonTreeEditor>` component. 

- According to parent `type: 'object'` or `type: 'array'`, a new node will be created.

- In case of `type: 'array'`, the parent node will show options to add/delete a child.

- According to child type, a quasar component will be rendered.

- Whenever the data is edited or sorted, the `<QJsonTreeEditor>` updates the data.

## `params`-Object
The JSON-schema can be extended with `params`-Object. This will e.g. wrap the children with a `vuedraggable-plus` component.

Currently, these params are available:
```json
{
  "type": "array",
  "params": {
    "expansible": false,
    "showAddButton": true,
    "sortable": true,
    "group": {
      "name": "myGroupName"
    }
  }
}
```

## Quasar components
You can already use some quasar components inside your tree:

Quasar's beautiful [Slider](https://quasar.dev/vue-components/slider):
```json
{
  "type": "number",
  "component": "Slider",
  "params": {
    "min": 0,
    "max": 100
  }
}
```

Or quasar's fantastic [ColorPicker](https://quasar.dev/vue-components/color-picker):
```json
{
  "type": "string",
  "component": "ColorPicker"
}
```

## Example JSON-Schema

Example taken from:
https://json-schema.org/learn/getting-started-step-by-step#create

```js
const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  title: 'Product',
  description: "A product from Acme's catalog",
  type: 'object',
  params: {
    // Always expanded:
    expansible: false,
  },
  properties: {
    productId: {
      description: 'The unique identifier for a product',
      type: 'integer',
    },
    productName: {
      description: 'Name of the product',
      type: 'string',
    },
    price: {
      description: 'The price of the product',
      type: 'number',
      exclusiveMinimum: 0,
    },
    tags: {
      description: 'Tags for the product',
      type: 'array',
      items: {
        type: 'string',
      },
      // Make it sortable:
      params: {
        sortable: true,
        showAddButton: true,
        group: {
          name: 'numbers',
        },
      },
      minItems: 1,
      uniqueItems: true,
    },
    dimensions: {
      type: 'object',
      properties: {
        length: {
          type: 'number',
        },
        width: {
          type: 'number',
        },
        height: {
          type: 'number',
        },
      },
      required: ['length', 'width', 'height'],
    },
  },
  required: ['productId', 'productName', 'price'],
};
```

## Example Object:

```js
const data = reactive({
  productId: 1,
  productName: "An ice sculpture",
  price: 12.5,
  tags: ["cold", "ice"],
  dimensions: {
    length: 7.0,
    width: 12.0,
    height: 9.5,
  },
});
```

# Usage
```vue
  <QJsonTreeEditor
    :schema="jsonSchema"
    v-model="data"
    @updated="submitData"
  >
  </QJsonTreeEditor>
```

# Donate

If you appreciate the work that went into this project, please consider [donating to Quasar](https://donate.quasar.dev).

# License

MIT (c) singerla
