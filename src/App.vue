<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark" class="mb-4" fixed="top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <div class="container">

      <b-navbar-brand href="/#/">
        <span class="mdi mdi-food"></span>
        TouchMate
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/" exact><span class="mdi mdi-account-multiple"></span> Users</b-nav-item>
          <b-nav-item to="/users/add" exact><span class="mdi mdi-account-plus"></span> add User</b-nav-item>
          <b-nav-item to="/products/" exact><span class="mdi mdi-tag"></span> show Products</b-nav-item>
          <b-nav-item to="/products/add" exact><span class="mdi mdi-tag-plus"></span>add Product</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
    </b-navbar>
    <div class="container">
      <router-view v-bind:serverinfo="serverinfo"></router-view>
    </div>
  </div>
</template>

<script>

import showUsers from './components/showUsers.vue'
import showUser from './components/showUser.vue'
import addUser from './components/addUser.vue'
import addProduct from './components/addProduct.vue'
import showProducts from './components/showProducts.vue'
import showProduct from './components/showProduct.vue'

export default {
  components: {
    'show-users': showUsers,
    'add-user': addUser,
    'show-user': showUser,
    'add-product': addProduct,
    'show-products' : showProducts,
    'show-product': showProduct,
  },
  name: 'app',
  data () {
    return {
      serverinfo: [],
    }
  },
  methods: {

  },
  mounted() {
    this.$http.get('//localhost:8080/v3/info').then(function(data) {
      console.log(data);
      this.serverinfo = data.body;
      console.log(data.body.decimal_separator);
    }, function(data) {
      console.log(data);
    });
  },
}
</script>

<style>

</style>
