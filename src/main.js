import '../node_modules/bootswatch/dist/slate/bootstrap.css';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import Notifications from 'vue-notification';
import Routes from './routes';
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

// const options = {
//   toast: {
//     position: SnotifyPosition.rightTop,
//     backdrop: -1,
//     pauseOnHover: true,
//     closeOnClick: true,
//     timeout: 7000,
//     showProgressBar: true,
//   },
// };

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueRouter);
// Vue.use(Snotify, options);
// Vue.use(SnotifyPosition);
Vue.use(Notifications);

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

Vue.filter('alcohol', (value, decimal_separator = ',') => {
  let formated = '';
  let val = value;

  if (!val) {
    val = `00`;
  } else if (val.toString().length === 1) {
    val = `0${val}`;
  }
  formated = val.toString().slice(0, -1);
  formated += decimal_separator;
  formated += val.toString().substr(-1, 2);

  return `${formated} vol.%`;
});

Vue.filter('sugar', (value, decimal_separator = ',') => {
  let formated = '';
  let val = value;

  if (!val) {
    val = `00`;
  } else if (val.toString().length === 1) {
    val = `0${val}`;
  }
  formated = val.toString().slice(0, -1);
  formated += decimal_separator;
  formated += val.toString().substr(-1, 2);

  return `${formated} g / 100 g or ml`;
});

Vue.filter('energy', (value, unit = 'kcal') => `${value} ${unit}/100 g or ml`);

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
