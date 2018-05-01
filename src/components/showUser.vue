<template>
  <div id="show-user">
    <div ref="pagetop"></div>
    <div v-show="loading" class="loading">
      <span class="mdi mdi-spin mdi-loading"></span>
    </div>
    <b-alert
      :show="rechargeSuccess"
      variant="success"
      class="mb-4 mt-4"
      dismissible
      @dismissed="rechargeSuccess=false"
    >
      Account recharged with <strong>{{ rechargeAmount | currency }}</strong>.
      Your new balance is: <strong>{{ user.balance | currency }}</strong>.
    </b-alert>

    <b-alert
      :show="buySuccess"
      variant="success"
      class="mb-4 mt-4"
      dismissible
      @dismissed="buySuccess=false"
    >
      You bought a <strong>{{ rechargeAmount | currency }}</strong>.
      Your new balance is: <strong>{{ user.balance | currency }}</strong>.
    </b-alert>

    <b-alert
      :show="productError"
      variant="danger"
      dismissible
      @dismissed="productError=false"
    >
        Unable to get products from your space market API. Please try again. If the error
        persists, please contact the haxxor in charge!
        <b-progress variant="danger"
                  :max="10"
                  :value="5"
                  class="mt-2"
                  striped
                  height="2px">
      </b-progress>
    </b-alert>
    <b-alert
      :show="userError"
      variant="danger"
      dismissible
      @dismissed="userError=false"
    >
        Unable to get the user from your space market API. Please try again. If the error
        persists, please contact the haxxor in charge!
    </b-alert>
    <h2 class="mb-4">{{ user.name }}</h2>
    <div class="row">
      <div class="col-12 col-sm-8">
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
            {{ moment(user.created_at).fromNow()}}
          </dd>
          <dt>
            Account last updated:
          </dt>
          <dd>
            {{ moment(user.updated_at).fromNow() }}
          </dd>
        </dl>
      </div>
      <div class="col-12 col-sm-4 text-center">
        <b-img v-if="user.avatar" class="img-fluid" style="max-width:150px; max-width:150px;" v-bind:src="'//localhost:8080/v3/images/' + user.avatar + '/img/'" />
        <b-img v-if="!user.avatar" class="img-fluid" style="max-width:150px; max-width:150px;" src="/src/assets/img/user.png" />
      </div>
    </div>
    <h2>Choose your poison</h2>

    <div class="row" v-show="!productError">

      <div v-for="product in products" v-bind:key="product.id" class="tm-item-container col-4 col-sm-3 col-md-2">
        <div class="tm-item" v-on:click="buyProduct(product.id, product.price)">
          <div class="tm-item-img">
            <b-img v-if="product.image" class="img-fluid" v-bind:src="'//localhost:8080/v3/images/' + product.image + '/img/'" />
          </div>
          <div class="name">
            {{ product.name }}
            <strong>
              {{ product.price | currency }}
            </strong>
          </div>
        </div>
      </div>
    </div>
    <h2>Recharge your account</h2>
    <div class="row">
      <div class="tm-item-container col-4 col-sm-3 col-md-2"
        v-for="amount in serverinfo.denominations"
        v-bind:key="amount"
        v-on:click="rechargeAccount(amount)"
      >
        <div class="tm-item">
          <b-img v-bind:src="'/src/assets/img/money/' + amount + '.png'" fluid />
          <div class="name">
            <strong>
              {{ amount | currency }}
            </strong>
          </div>
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
      productError: false,
      userError: undefined,
      userStatus: 0,
      loading: true,
      rechargeSuccess: false,
      rechargeAmount: false,
      buySuccess: false,
      buyPrice: false,
      server: {
        currency: '€',
        decimal_separator: ",",
        currency_before: false,
      }
    }
  },
  methods: {
    rechargeAccount: function(amount) {
      console.log('recharge account with amount: ' + amount);
      this.$http.post('//localhost:8080/v3/users/' + this.user.id + '/deposit/', {
        amount: amount,
      }).then( response => {
        console.log(response);
        if (response.status === 204) {
          this.rechargeSuccess = true;
          this.rechargeAmount = amount;
          this.user.balance += amount;
          $("html, body").animate({
            scrollTop: 0
          }, 200);
        }
      });
    },
    buyProduct: function(product, price) {
      console.log('buy product ' + product);document.body
      this.buyPrice = price;
      this.$http.post('//localhost:8080/v3/users/' + this.user.id + '/buy/', {
        product: product,
      }).then( reponse => {
        console.log("product bought");
        this.user.balance -= this.buyPrice;
        this.buySuccess = true;
      }, response => {
        console.log("bought failed");
        console.log(response);
      });
    },
  },
  mounted() {
    this.loading = true;
    this.$http.get('http://localhost:8080/v3/users/' + this.id, {timeout: 0}).then(function(data) {
      this.user = data.body;
      console.log(data.body.balance);
      this.userError = false;
      console.log(this.user);
    }, function(data) {
      this.userError = true;
      this.userStatus = data.status;
    });

    this.$http.get('http://localhost:8080/v3/products', {timeout: 2000}).then(function(data) {
      this.products = data.body[0];
      this.productError = false;
      this.loading = false;
    }, function(data) {
      this.productStatus = data.status;
      this.productError = true;
      this.loading = false;
      console.log(data);
    });
  },
  updated() {
    console.log("updated");
    var elem = document.getElementById("container");
    console.log(elem);
    elem.scrollTop = 0;
  }
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
