<template>
  <div id="show-user">
    <div
      v-show="loading"
      class="loading">
      <span class="mdi mdi-spin mdi-loading"/>
    </div>
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
          <dt v-show="$config.privacy.user_email && user.email">
            E-Mail Address
          </dt>
          <dd v-show="$config.privacy.user_email && user.email">
            {{ user.email }}
          </dd>
          <dt v-show="$config.privacy.user_created">
            Account created:
          </dt>
          <dd v-show="$config.privacy.user_created">
            {{ user.created_at | datetime }}
          </dd>
          <dt v-show="$config.privacy.user_updated">
            Account last updated:
          </dt>
          <dd v-show="$config.privacy.user_updated">
            {{ user.updated_at | datetime }} <br>
          </dd>
        </dl>
      </div>
      <div class="col-12 col-sm-4 text-center">
        <b-img
          v-if="user.avatar"
          :src="'//localhost:8080/v3/images/' + user.avatar + '/img/'"
          class="img-fluid"
          style="max-width:150px; max-width:150px;" />
        <b-img
          v-if="!user.avatar && !$config.gravatar.use"
          class="img-fluid"
          style="max-width:150px; max-width:150px;"
          src="/src/assets/img/user.png" />
        <b-img
          v-if="!user.avatar && $config.gravatar.use"
          :src="user.email | gravatar"
          class="img-fluid"
          style="max-width:150px; max-width:150px;" />
      </div>
    </div>
    <h2>Choose your poison</h2>

    <div
      v-show="!products[0]"
      class="row">
      <div class="alert alert-warning col-12">
        No produts have been created by now. Be a hero and create the first one!
      </div>
    </div>
    <div
      v-if="products[0]"
      class="row">

      <div
        v-for="product in products"
        :key="product.id"
        class="tm-item-container col-4 col-sm-3 col-md-2">
        <div
          class="tm-item"
          @click="buyProduct(product)">
          <div class="tm-item-img">
            <b-img
              v-if="product.image"
              :src="$config.api_url + '/images/' + product.image + '/img/'"
              class="img-fluid" />
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
      <div
        v-if="!serverinfo.denominations[0]"
        class="alert alert-warning col-12">
        So far no amounts to recharge your account have been configured. <br>
        Please ask your haxxor in charge, to do so.
      </div>
    </div>
    <div
      v-if="serverinfo.denominations[0]"
      class="row">
      <div
        v-for="amount in serverinfo.denominations"
        :key="amount"
        class="tm-item-container col-4 col-sm-3 col-md-2"
        @click="rechargeAccount(amount)"
      >
        <div class="tm-item">
          <b-img
            :src="'/src/assets/img/money/' + amount + '.png'"
            fluid />
          <div class="name">
            <strong>
              {{ amount | currency(serverinfo.currency, serverinfo.currency_before, serverinfo.decimal_separator) }}
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
  data() {
    return {
      user: {},
      products: [],
      id: this.$route.params.id,
      productStatus: 0,
      productError: false,
      userError: undefined,
      userStatus: 0,
      loading: true,
      buySuccess: false,
      buyPrice: false,
      server: {
        currency: '€',
        decimal_separator: ',',
        currency_before: false,
      },
    };
  },
  mounted() {
    this.fetchUser();
    this.$http.get('http://localhost:8080/v3/products').then(
      data => {
        this.products = data.body[0];
        this.productError = false;
        this.loading = false;
      },
      data => {
        this.productStatus = data.status;
        this.productError = true;
        this.loading = false;
      }
    );
  },
  methods: {
    fetchUser(notification=false) {
      this.loading = true;
      this.$http.get(`http://localhost:8080/v3/users/${this.id}`).then(
        data => {
          this.user = data.body;
          console.log(data.body.balance);
          console.log(this.user);
          if (notification !== false) {
            this.$notify(notification);
          }
        },
        data => {
          this.$notify({});
        }
      );
      this.loading = false;
    },
    rechargeAccount(amount) {
      this.$http
        .post(`${this.$config.api_url}/users/${this.user.id}/deposit/`, {
          amount,
        })
        .then(response => {
          console.log(response);
          if (response.status === 204) {
            var notification = {
              type: 'success',
              title: 'Success',
              text: `Your recharged your account with ${amount}. Your new balance is: ${this.user.balance}`,
            };
            this.fetchUser(notification);
            var amountFormated = (amount);
            this.user.redirect ? this.$router.push('/') : false;
          }
        });
    },
    buyProduct(product) {
      this.$http
        .post(`//localhost:8080/v3/users/${this.user.id}/buy/`, {
          product: product.id,
        })
        .then(
          response => {},
          response => {
            this.$notify({
              title: 'Error',
              type: 'error',
              text: `Something went wrong while buying ${product.name}`,
            });
          }
        );
    },
  },
};
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
