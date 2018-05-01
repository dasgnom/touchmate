import '../node_modules/bootswatch/dist/slate/bootstrap.css';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import Routes from './routes';
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueRouter);

Vue.prototype.moment = moment;
Vue.prototype.momentTimezone = momentTimezone;

Vue.filter('currency', (value, currency = '€', currency_before = false, decimal_separator = ',') => {
  let formated = '';
  let val = value;

  if (!val) {
    val = `000`;
  } else if (val.toString().length === 1) {
    val = `00${val}`;
  } else if (val.toString().length === 2) {
    val = `0${val}`;
  }
  formated = val.toString().slice(0, -2);
  formated += decimal_separator;
  formated += val.toString().substr(-2, 2);

  if (currency_before) {
    return `${currency}${formated}`;
  }

  return `${formated} ${currency}`;
});

// VueRouter
const router = new VueRouter({
  mode: 'history',
  routes: Routes,
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
