<template>
  <div id="show-user">
    <div v-show="loading" class="loading">
      <span class="mdi mdi-spin mdi-loading"></span>
    </div>
    <h2 class="mb-4">Products</h2>

    <b-alert :show="productsError" variant="danger" v-on:dblclick="showAlertDetails = !showAlertDetails">
      <strong>Error:</strong> Unable to get product from your space market API. Please try again. If the error
      persists, please contact the haxxor in charge!
      <hr />
      The server returned error code {{ productsStatus }} ({{ productsStatusMessage }}) together with the message: <br /> <em>{{ productsErrorMessage }}</em>.
    </b-alert>
    <div class="row" v-show="!productsError">
      <table class="table table-hover table-striped">
      <tr>
        <th colspan="2">
          Product
        </th>
        <th>
          Price
        </th>
        <th>
          Energy
        </th>
        <th>
          Alcohol
        </th>
      </tr>
      <tbody>

      <tr v-for="product in products" v-bind:key="product.id">
          <td>
            <router-link :to="'/products/' + product.id">
              <img v-show="product.image" v-bind:src="'//localhost:8080/v3/images/' + product.image + '/img/'" class="img-fluid" style="max-width: 80px;"/>
              <img v-show="!product.image" src="/src/assets/img/user.png" class="img-fluid" style="max-width: 80px;"/>
            </router-link>
          </td>
          <td>
            <router-link :to="'/products/' + product.id">
            {{ product.name }}
            </router-link>
          </td>
          <td>
            {{ product.price }}
          </td>
          <td>
            {{ product.energy }}
          </td>
          <td>
            {{ product.alcohol }}
          </td>
      </tr>
    </tbody>
    </table>
    </div>
  </div>
</template>

<script>

export default {
  props: ['serverinfo'],
  data () {
    return {
      products: [],
      id: this.$route.params.id,
      productsStatus: 0,
      productsError: false,
      productsStatusMessage: '',
      productsErrorMessage: '',
      loading: true,
      showAlertDetails: false,
    }
  },
  methods: {
  },
  mounted() {
    this.loading = true;
    this.$http.get('http://localhost:8080/v3/products').then(function(data) {
      this.products = data.body[0];
      this.loading = false;
      console.log("products loaded");
      this.productsError = false;
    }, function(data) {
      this.productsStatus = data.status;
      this.productsError = true;
      this.productsErrorMessage = data.body;
      this.productsStatusMessage = data.statusText;
      this.loading = false;
      console.log(data);
    });
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
