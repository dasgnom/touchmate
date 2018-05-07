<template>
  <div id="show-user">
    <div v-show="loading" class="loading">
      <span class="mdi mdi-spin mdi-loading"></span>
    </div>
    <h2 class="mb-4">Products</h2>

    <div class="row">
      <table class="table table-hover table-striped">
        <tr>
          <th colspan="2">
            Product
          </th>
          <th>
            Price
          </th>
          <th>
            Package Size
          </th>
          <th>
            Energy
          </th>
          <th>
            Sugar
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
                {{ product.price | currency(serverinfo.currency, serverinfo.currency_before, serverinfo.decimal_seperator) }}
              </td>
              <td>
                {{ product.package_size }}
              </td>
              <td>
                {{ product.energy | energy(serverinfo.energy) }}
              </td>
              <td>
                {{ product.sugar | sugar(serverinfo.decimal_separator) }}
              </td>
              <td>
                {{ product.alcohol | alcohol(serverinfo.decimal_seperator) }}
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
      loading: true,
    }
  },
  methods: {
  },
  mounted() {
    this.loading = true;
    this.$http.get('http://localhost:8080/v3/products').then(function(data) {
      this.products = data.body[0];
      this.loading = false;
    }, function(data) {
      this.loading = false;
      this.$notify(
        {
          type: 'error',
          title: 'Error',
          text: 'Unable to load products from your <em>space market api</em>. \
          Please try again. If the error persists contact the haxxor in charge \
          The server returned the error code <strong>' + data.status + '</strong>',
          duration: -1,
        }
      );
    });
  },
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
