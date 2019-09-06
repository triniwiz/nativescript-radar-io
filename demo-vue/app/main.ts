import Vue from 'nativescript-vue'
import * as app from 'tns-core-modules/application';
import { RadarIO } from 'nativescript-radar-io';
import { isIOS } from 'tns-core-modules/platform';
import App from './components/App.vue'

import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = true; //(TNS_ENV === 'production')

app.on(app.launchEvent, async (args) => {
  RadarIO.initialize("prj_test_pk_b38b9b97c5ea101516d494c9c688afb32db27ba2");
  RadarIO.setUserId("demo-vue");
  RadarIO.setDescription("Vue Demo " + (isIOS ? "iOS" : "Android"));
  RadarIO.setMetadata({
    name: "Test User 1"
  });
});

new Vue({
  render: h => h('frame', [h(App)])
}).$start()
