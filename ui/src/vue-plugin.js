import Component from "./components/QJsonTreeEditor.vue";

const version = __UI_VERSION__;

function install(app) {
  app.component("QJsonTreeEditor", Component);
}

export { version, Component, install };
