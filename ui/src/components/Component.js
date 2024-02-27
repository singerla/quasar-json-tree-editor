import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'QJsonTreeEditor',

  setup () {
    return () => h(QBadge, {
      class: 'QJsonTreeEditor',
      label: 'QJsonTreeEditor'
    })
  }
}
