<template>
  <div id="app">
    <b-navbar
      toggleable="md"
      type="dark"
      variant="dark"
      class="mb-4"
      fixed="top">
      <div class="container">
        <b-navbar-toggle target="nav_collapse"/>
        <b-navbar-brand href="/#/">
          <span class="mdi mdi-food"/>
          TouchMate
        </b-navbar-brand>
        <b-collapse
          id="nav_collapse"
          is-nav>
          <b-navbar-nav>
            <b-nav-item
              to="/"
              exact><span class="mdi mdi-account-multiple"/> Users</b-nav-item>
            <b-nav-item
              to="/stats"
              exact><span class="mdi mdi-chart-bar"/> Stats</b-nav-item>
            <b-nav-item
              to="/products"
              exact><span class="mdi mdi-tag"/> Products</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              v-if="$route.path==='/products' || /\/products\/?\d{0,6}/g.test($route.path)"
              to="/products/add"
              exact><span class="mdi mdi-tag-plus"/>add Product</b-nav-item>
            <b-nav-item
              v-if="$route.path==='/' || /\/\d{0,6}$/g.test($route.path)"
              to="/users/add"
              exact><span class="mdi mdi-account-plus"/> add User</b-nav-item>
            <b-nav-item
              v-if="$route.path==='/users/' || /\/users\/?\d{0,6}$/g.test($route.path)"
              :to="'/users/' + $route.params.id + '/edit'"
              exact><span class="mdi mdi-account-edit"/>edit User</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <div
      id="container"
      class="container mb-4">
      <notifications position="top center" width="60%"/>
      <router-view :serverinfo="serverinfo"/>

    </div>
    <footer class="footer bg-dark">
      <div class="container text-center">
        <span class="text-muted">
          Developed with <span class="mdi mdi-heart text-danger"></span> in your local hackerspaces
          &mdash; <a href="https://github.com/telegnom/touchmate" class="text-muted"><span class="mdi mdi-github-circle"></span> contribute to improve touchmate</a>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import addProduct from './components/addProduct.vue';
import addUser from './components/addUser.vue';
import showProduct from './components/showProduct.vue';
import showProducts from './components/showProducts.vue';
import showUser from './components/showUser.vue';
import showUsers from './components/showUsers.vue';
import editUser from './components/editUser.vue';

export default {
  name: 'App',
  components: {
    'show-users': showUsers,
    'add-user': addUser,
    'show-user': showUser,
    'add-product': addProduct,
    'show-products': showProducts,
    'show-product': showProduct,
    'edit-user': editUser,
  },
  data() {
    return {
      serverinfo: [],
    };
  },
  beforeMount() {
    this.$http.get('//localhost:8080/v3/info').then(
      function(data) {
        this.serverinfo = data.body;
      },
      data => {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: 'Unable to load server informations from Server.',
        });
      }
    );
  },
  methods: {},
};
</script>

<style>
</style>
