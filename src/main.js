import '../node_modules/bootswatch/dist/slate/bootstrap.css';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Crypto from 'crypto';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import Notifications from 'vue-notification';
import Routes from './routes';
import TouchMate from './modules/touchmate';
import Vue from 'vue';
import VueConfig from 'vue-config';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

const defaultConfig = require('./config');
let localConfig;

try {
  localConfig = require('./config_local');
} catch (e) {
  localConfig = {};
}

const config = { ...defaultConfig, ...localConfig };

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Notifications);
Vue.use(VueConfig, config);

Vue.prototype.moment = moment;
Vue.prototype.momentTimezone = momentTimezone;

Vue.filter('currency', (value, currency = '€', currency_before = false, decimal_separator = ',') =>
  TouchMate.currency(value, currency, currency_before, decimal_separator)
);

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

Vue.filter(
  'datetime',
  (
    value,
    timezone_api = config.timezone_api,
    timezone_client = config.timezone_client,
    datetimeformat = config.datetimeformat
  ) =>
    moment
      .tz(value, timezone_api)
      .tz(timezone_client)
      .format(datetimeformat)
);

Vue.filter(
  'gravatar',
  (email, size = config.gravatar.size, fallback = config.gravatar.fallback, rating = config.gravatar.rating) => {
    let mail = '';

    if (email == null) {
      mail = '';
    }
    const hash = Crypto.createHash('md5')
      .update(mail)
      .digest('hex');

    return `${config.gravatar.base_url}${hash}?s=${size}&d=${fallback}&r=${rating}`;
  }
);

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
