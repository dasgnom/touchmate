<template>
  <div id="show-user">
    <div v-bind:class="{loading: loading}">
    <div v-show="{loading: loading}">
      <span class="mdi mdi-spin mdi-loading"></span>
    </div>
    <h2>Users</h2>
    <b-card
      v-show="userError"
      bg-variant="danger"
      text-variant="white"
      header="<strong>ERROR</strong>">
      <p class="card-text">
        Unable to get products from your space market API. Please try again. If the error
        persists, please contact the haxxor in charge!
      </p>
    </b-card>
    <ul class="user">
      <li v-for="(value, key) in user" v-bind:key="key">
        {{ key }}:
        {{ value }}
      </li>
    </ul>
    <h2>Choose your poison</h2>

    <b-card
      v-show="productError"
      bg-variant="danger"
      text-variant="white"
      header="<strong>ERROR</strong>">
      <p class="card-text">
        Unable to get products from your space market API. Please try again. If the error
        persists, please contact the haxxor in charge!
      </p>
    </b-card>
    <ul v-show="!productError">
      <li v-for="product in products" v-bind:key="product.id">
        {{ product.name }}
      </li>
    </ul>
  </div>
  </div>
</template>

<script>

export default {
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
    }
  },
  methods: {
  },
  mounted() {
    this.loading = true;
    this.$http.get('http://localhost:2342/v3/users/' + this.id).then(function(data) {
      this.user = data.body;
      this.userError = false;
      console.log(data);
    }, function(data) {
      this.userError = true;
      this.userStatus = data.status;
    });
    this.$http.get('http://localhost:2342/v3/products').then(function(data) {
      this.products = data.body[0];
      this.productError = false;
      console.log(data);
      this.loading = false;
    }, function(data) {
      this.productStatus = data.status;
      this.productError = true;
    });
  }
}
</script>

<style scoped>
  .loading {
    background: red;
  }
</style>
