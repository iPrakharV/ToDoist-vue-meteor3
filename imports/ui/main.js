import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'
import { VueMeteor } from 'vue-meteor-tracker'

import Root from './Root.vue'
import { router } from './router'

Meteor.startup(() => {
  const app = createApp(Root)
  app.use(router)
  app.use(VueMeteor)
  app.mount('#app')
})