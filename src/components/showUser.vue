<template>
  <div id="show-user">
    <div v-show="loading" class="loading">
      <span class="mdi mdi-spin mdi-loading"></span>
    </div>
    <h2 class="mb-4">{{ user.name }}</h2>
    <div class="row">
      <div class="col-8">
        <dl>
          <dt class="lead">
            <strong>
              Balance
            </strong>
          </dt>
          <dd class="lead">
            {{ user.balance | currency }}
          </dd>
          <dt>
            Account created:
          </dt>
          <dd>
            <!-- {{ moment.tz(user.created_at, 'EUROPE/BERLIN').format('YYYY-MM-DD HH:mm') }} -->
            {{ moment(user.created_at).fromNow()}}
          </dd>
          <dt>
            Account last updated:
          </dt>
          <dd>
            <!-- {{ moment.tz(user.updated_at, 'EUROPE/BERLIN').format('YYYY-MM-DD HH:mm') }} -->
            {{ moment(user.updated_at).fromNow() }}
          </dd>
        </dl>
      </div>
      <div class="col-4 text-center">
        <b-img v-if="user.avatar != 0" class="img-fluid" style="max-width:120px; max-width:120px;" v-bind:src="'//localhost:8080/v3/images/' + user.avatar + '/img/'" />
      </div>
    </div>
    <b-alert
      v-show="productError"
      bg-variant="danger"
      text-variant="white">
        Unable to get products from your space market API. Please try again. If the error
        persists, please contact the haxxor in charge!
    </b-alert>
    <b-alert
      v-show="userError"
      bg-variant="danger"
      text-variant="white">
        Unable to get the user from your space market API. Please try again. If the error
        persists, please contact the haxxor in charge!
    </b-alert>
    <h2>Choose your poison</h2>

    <div class="row" v-show="!productError">
      <div v-for="product in products" v-bind:key="product.id" class="tm-item">
        <b-img v-if="product.image" style="max-width: 100px; max-height: 100px;" class="img-fluid" v-bind:src="'//localhost:8080/v3/images/' + product.image + '/img/'" />
        <div class="name">
          {{ product.name }} <br />
          {{ product.price }}
        </div>
      </div>
    </div>
    <h2>Recharge your account</h2>
    <div class="row">
      <div class="col-2" v-for="amount in serverinfo.denominations" v-bind:key="amount">
        <b-img v-bind:src="'src/assets/img/money/' + amount + '.png'" fluid-grow />
        <div class="name">
          {{ amount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['serverinfo'],
  data () {
    return {
      user: {},
      products: [],
      id: this.$route.params.id,
      productStatus: 0,
      productError: undefined,
      userError: undefined,
      userStatus: 0,
      loading: true,
      recharge: [50, 100, 200, 500, 1000, 2000, 5000],
      server: {
        currency: '€',
        decimal_separator: ",",
        currency_before: false,
      }
    }
  },
  methods: {
  },
  mounted() {
    this.loading = true;
    this.$http.get('http://localhost:8080/v3/users/' + this.id).then(function(data) {
      this.user = data.body;
      // if (this.user.balance == 0) {
      //   this.user.balance = "0" + this.server.decimal_separator + "00";
      // }
      console.log(data.body.balance);
      this.userError = false;
      console.log(this.user);
    }, function(data) {
      this.userError = true;
      this.userStatus = data.status;
    });

    this.$http.get('http://localhost:8080/v3/products').then(function(data) {
      this.products = data.body[0];
      this.productError = false;
      this.loading = false;
    }, function(data) {
      this.productStatus = data.status;
      this.productError = true;
      this.loading = false;
    });
  }// if (this.user.balance == 0) {
      //   this.user.balance = "0" + this.server.decimal_separator + "00";
      // }
}
</script>

<style scoped>
  .loading {
    background: #333333cc;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90%;
    z-index: 999;
    margin: 0 auto;
    vertical-align: middle;
    text-align: center;
    font-size: 4em;
    color: #fff;
    margin-top: 59px;
  }
</style>
