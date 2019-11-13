import Vue from 'vue';
import App from './App.vue';
import store from './store';
// @ts-ignore
import IqonsSvg from '@nimiq/iqons/dist/iqons.min.svg';

if (window.hasBrowserWarning) {
  throw new Error('Exeution aborted due to browser warning');
}

Vue.config.productionTip = false;

// Set up Identicon SVG file path
if (IqonsSvg[0] === '"') {
    // @ts-ignore
    self.NIMIQ_IQONS_SVG_PATH = IqonsSvg.substring(1, IqonsSvg.length - 1);
} else {
    // @ts-ignore
    self.NIMIQ_IQONS_SVG_PATH = IqonsSvg;
}

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
