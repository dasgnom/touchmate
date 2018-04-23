<template>
  <div id="show-product">
    <div v-show="loading" class="loading">
      <span class="mdi mdi-spin mdi-loading"></span>
    </div>
    <h2 class="mb-4">edit {{ product.name }}</h2>
    <b-card
      v-if="productError"
      bg-variant="danger"
      text-variant="white"
      header="<strong>ERROR</strong>">
      <p class="card-text">
        Unable to get the product from your space market API. Please try again. If the error
        persists, please contact the haxxor in charge!
      </p>
    </b-card>
    <b-alert
      :show="updateSuccess"
      variant="success"
      class="mb-4 mt-4"
      dismissible
      @dismissed="updateSuccess=false"
    >
      Product updated
    </b-alert>
    <form class="form" v-on:submit.prevent="updateProduct">
    <div class="row">
      <div class="col-8">
          <div class="row">
            <div class="col-12">
              <b-form-group
                label="product id (readonly)"
                description="show products id"
              >
                <b-form-input v-model="product.id" disabled class="bg-disabled text-black"></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12">
              <b-form-group
                label="product name"
                description="edit product's name"
              >
                <b-form-input v-model="product.name"></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <b-form-group
                label="product price"
                description="edit product's price"
              >
                <b-input-group>
                  <b-input-group-text slot="prepend" v-if="serverinfo.currency_before">
                    <span class="text-white">{{ serverinfo.currency }}</span>
                  </b-input-group-text>
                  <b-form-input
                    placeholder="1.50"
                    pattern=""
                    v-model="product.price"
                    pattern="[0-9]+[.,][0-9]+"
                    required
                  />
                  <b-input-group-text slot="append" v-if="!serverinfo.currency_before">
                    <span class="text-white">{{ serverinfo.currency }}</span>
                  </b-input-group-text>
                </b-input-group>
              </b-form-group>
            </div>
          </div>
      </div>
    <div class="col-4">
      Bild und so
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-6">
          <b-form-group
            label="energy"
            description="energy per 100g/ml"
          >
            <b-input-group>
                <b-form-input v-model="product.energy" id="product_energy"/>
                <b-input-group-text slot="append">
                  <span class="text-white">{{ serverinfo.energy }} per 100g/ml</span>
                </b-input-group-text>
            </b-input-group>
          </b-form-group>
        </div>
        <div class="col-6">
          <b-form-group
            label="sugar"
            description="sugar in g per 100ml/g"
          >
            <b-input-group>
                <b-form-input v-model="product.sugar" id="product_sugar"/>
                <b-input-group-text slot="append">
                  <span class="text-white">g per 100g/ml</span>
                </b-input-group-text>
            </b-input-group>
          </b-form-group>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-6">
          <b-form-group
            label="caffeine"
            description="caffeine in mg per 100g/ml"
          >
            <b-input-group>
                <b-form-input v-model="product.caffeine" id="product_caffeine"/>
                <b-input-group-text slot="append">
                  <span class="text-white">mg per 100g/ml</span>
                </b-input-group-text>
            </b-input-group>
          </b-form-group>
        </div>
        <div class="col-6">
          <b-form-group
            label="alcohol"
            description="alcohol by volume"
          >
            <b-input-group>
                <b-form-input v-model="product.alcohol" id="product_alcohol"/>
                <b-input-group-text slot="append">
                  <span class="text-white">% by volume</span>
                </b-input-group-text>
            </b-input-group>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <b-form-group
            id="product_image_group"
            description="Choose a product image"
            label="product image"
            label-for="product_image"
          >
            <b-form-file v-model="file" placeholder="Choose a file..." class="form-control text-white"></b-form-file>
          </b-form-group>
        </div>
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Save Product</button>
</form>
</div>
</template>

<script>

export default {
  props: ['serverinfo'],
  data () {
    return {
      product: {},
      pid: this.$route.params.pid,
      productStatus: 0,
      productError: false,
      loading: true,
      server: {},
      file: false,
      updateSuccess: false,
    }
  },
  methods: {
    updateProduct: function() {
      console.log("updating product")
      this.$http.patch('//localhost:8080/v3/products/' + this.product.id.toString(), {
        name: this.product.name,
        price: this.product.price.replace(",", "").replace(".", ""),
        energy: this.product.energy,
        sugar: this.product.sugar,
        caffeine: this.product.caffeine,
        alcohol: this.product.alcohol,
      }).then(function(response) {
        console.log(response);
        this.updateSuccess = true;
      }, function(response) {
        console.log(response);
      });
    }
  },
  mounted() {
    this.loading = true;
    console.log(this.pid);
    this.$http.get('http://localhost:8080/v3/products/' + this.pid).then(function(data) {
      this.product = data.body;
      this.product.price = data.body.price.toString().slice(0, -2) + this.serverinfo.decimal_separator + data.body.price.toString().substr(-2, 2);
      this.productError = false;
      console.log(data.body);
      this.loading = false;
    }, function(data) {
      this.productStatus = data.status;
      this.productError = true;
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

  .custom-file-label::after {
    content: "Browse";
  }
  .custom-file-label {
    color: #white;
  }
</style>
