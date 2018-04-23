import '../node_modules/bootswatch/dist/darkly/bootstrap.css';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Routes from './routes';
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueRouter);

Vue.filter('currency', value => {
  if (value.toString().trim() === 0) {
    return '0,00';
  } else if (value.toString().trim().strlen === 2) {
    return `0,${value.toString().substr(-2, 2)} €`;
  } else if (value.toString().trim().strlen === 1) {
    return `0${value.toString().slice(0, -2)},0${value.toString().substr(-2, 2)} €`;
  } else if (value.toString().trim().strlen > 2) {
    // return value.toString().slice(0, -2) + value.toString().substr(-2, 2);
  }

  return 'foo';
});

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
