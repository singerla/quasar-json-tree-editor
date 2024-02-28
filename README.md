## This is a work in progress.

<img src="https://img.shields.io/npm/v/quasar-ui-json-tree-editor.svg?label=quasar-ui-json-tree-editor">
<img src="https://img.shields.io/npm/v/quasar-app-extension-json-tree-editor.svg?label=quasar-app-extension-json-tree-editor">

Compatible with Quasar UI v2 and Vue 3.

# Structure

- [/ui](ui) - standalone npm package

- [/app-extension](app-extension) - Quasar app extension

# How it will work
Pass a JSON-Schema and a valid or empty object to the `<QJsonTreeEditor>` component. 

According to parent `type: 'object'` or `type: 'array'`, a new node will be created.

In case of `type: 'array'`, the parent node will show options to add/delete a child.

According to child type, a quasar input component will be rendered.

The JSON-schema can be extended with `isSortable: true`. This will wrap the children with a `vuedraggable` component.

Whenever the data is edited or sorted, the `<QJsonTreeEditor>` validates and updates the data.

# JSON-Schema

Example taken from:
https://json-schema.org/learn/getting-started-step-by-step#create

```js
const jsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://example.com/product.schema.json',
  title: 'Product',
  description: "A product from Acme's catalog",
  type: 'object',
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

Example Object:

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
    :data="data"
    @updated="submitData"
  >
  </QJsonTreeEditor>
```

# Donate

If you appreciate the work that went into this project, please consider [donating to Quasar](https://donate.quasar.dev).

# License

MIT (c) singerla <tsinger@gmx.de>
