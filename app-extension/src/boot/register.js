import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-json-tree-editor'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
