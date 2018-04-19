<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <div class="container">

      <b-navbar-brand href="/#/">
        <img src="src/assets/img/logo_icon.png" alt="icon">
        Gluckerstrich
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/" exact><span class="mdi mdi-account-multiple"></span> Users</b-nav-item>
          <b-nav-item to="/users/add" exact><span class="mdi mdi-account-plus"></span> add User</b-nav-item>
          <b-nav-item to="/products/add" exact><span class="mdi mdi-tag-plus"></span>add Product</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
    </b-navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import showUsers from './components/showUsers.vue'
import showUser from './components/showUser.vue'
import addUser from './components/addUser.vue'
import addProduct from './components/addProduct.vue'

export default {
  components: {
    'show-users': showUsers,
    'add-user': addUser,
    'show-user': showUser,
    'add-product': addProduct,
  },
  name: 'app',
  data () {
    return {

    }
  },
  methods: {

  },
}
</script>

<style>

</style>
