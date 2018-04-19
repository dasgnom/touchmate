import App from './App.vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Routes from './routes';
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueRouter);

// VueRouter
const router = new VueRouter({
  mode: 'hash',
  routes: Routes,
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
