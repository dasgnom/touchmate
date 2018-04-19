import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import Routes from './routes'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(VueResource)
Vue.use(VueRouter)

// VueRouter

const router = new VueRouter({
  mode: 'hash',
  routes: Routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
})
