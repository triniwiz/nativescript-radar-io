import Vue from 'nativescript-vue'
import App from './components/App.vue'

import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = true; //(TNS_ENV === 'production')

// import { RadarIO } from 'nativescript-radar-io';
import { RadarIO } from 'nativescript-radar-io';
import { isIOS } from 'tns-core-modules/platform';

RadarIO.initialize("prj_test_pk_98f103a8def0642a9ac4168b58ed26b50eeb1fc7");  // gary
// RadarIO.initialize("prj_test_pk_40052cf0a885c689dd45df97d1f76eb22f5b80f5");  // carissa
RadarIO.setUserId('demo-vue-garyg-tester2');
RadarIO.setDescription('Vue Demo ' + (isIOS ? 'iOS': 'Android') );
RadarIO.setMetadata({
    name: 'Gary Gambill'
});



new Vue({
  render: h => h('frame', [h(App)])
}).$start()
