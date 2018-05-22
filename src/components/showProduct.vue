<template>
  <div id="show-product">
    <div v-show="loading" class="loading">
      <span class="mdi mdi-spin mdi-loading"></span>
    </div>
    <h2 class="mb-4">edit {{ product.name }}</h2>
    <form class="form" v-on:submit.prevent="updateProduct" v-on:keyup.enter="saveProduct()">
    <div class="row">
      <div class="col-8">
          <div class="row">
            <div class="col-12">
              <b-form-group
                label="product id (readonly)"
                description="shows product's id"
              >
                <b-form-input v-model="product.id" disabled class="bg-disabled text-black"></b-form-input>
              </b-form-group>
            </div>
            <div class="col-12">
              <b-form-group
                label="product name"
                description="product's name"
              >
                <b-form-input v-model="product.name"></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <b-form-group
                label="price"
                description="product's price"
              >
                <b-input-group>
                  <b-input-group-text slot="prepend" v-if="serverinfo.currency_before">
                    <span>{{ serverinfo.currency }}</span>
                  </b-input-group-text>
                  <b-form-input
                    placeholder="1.50"
                    pattern="[0-9]+[.,][0-9]{2}"
                    required
                    v-model="product.price"
                    v-bind:value="product.price"
                  />
                  <b-input-group-text slot="append" v-if="!serverinfo.currency_before">
                    <span>{{ serverinfo.currency }}</span>
                  </b-input-group-text>
                </b-input-group>
              </b-form-group>
            </div>

          </div>
      </div>

    <div class="col-4 tm-productImage h-100 d-block">
      <img v-if="product.image" v-bind:src="'//localhost:8080/v3/images/' + product.image + '/img/'" class="img-fluid rounded col-9 mx-auto d-block">
      <button v-if="product.image" class="btn btn-danger mt-3 mx-auto d-block" v-on:click.prevent.self="deleteImage()">Delete Picture</button>
      <div v-if="!product.image" class="text-center align-middle h-100 mt-4">
        <b-form-file v-on:input="saveImage()" id="productImage" v-model="image" class="form-control invisible" style="opacity: 0.0;"></b-form-file>
        <button v-if="!product.image" class="btn btn-secondary align-middle" v-on:click.prevent="chooseFiles()">Add Picture</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <b-form-group
        label="package size"
        description="package size"
      >
        <b-form-input v-model="product.package_size"></b-form-input>
      </b-form-group>
    </div>
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
                  <span>{{ serverinfo.energy }} per 100g/ml</span>
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
                <b-form-input v-model="product.sugar" id="product_sugar" pattern="(0)|([0-9]+[.,][0-9]{1})"/>
                <b-input-group-text slot="append">
                  <span>g per 100g/ml</span>
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
                  <span>mg per 100g/ml</span>
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
                <b-form-input v-model="product.alcohol" id="product_alcohol" pattern="(0)|([0-9]+[.,][0-9]{1})"/>
                <b-input-group-text slot="append">
                  <span>% by volume</span>
                </b-input-group-text>
            </b-input-group>
          </b-form-group>
        </div>
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Save Product</button>
</form>
<div class="row">
  <div class="col-12">
    <h2 class="text-danger mt-4">Danger Zone</h2>
    <p class="text-danger">You can delete the product. But be carful, it can't be reverted!</p>
    <div>
      <b-btn v-b-modal.modal-delProd class="btn-danger">Delete Product</b-btn>
      <b-modal
        id="modal-delProd"
        header-bg-variant="danger"
        header-text-variant="light"
        body-text-variant="danger"
        ok-variant="danger"
        ok-title="Delete!"
        cancel-varian="secondary"
        lazy
        @ok="deleteProd"
        centered title="Delete Product?">
        <p class="my-4">Are you sure you wanna delete <strong>{{ this.product.name }}</strong>? This process can't be reverted.</p>
      </b-modal>
    </div>
  </div>
</div>
</div>
</template>

<script>
import TouchMate from '../modules/touchmate';
export default {
  props: ['serverinfo'],
  data () {
    return {
      price: false,
      product: {},
      pid: this.$route.params.pid,
      productStatus: 0,
      loading: true,
      server: {},
      image: null,
    }
  },
  methods: {
    deleteProd: function() {
      this.$http.delete(`${this.$config.api_url}products/${this.product.id}/`).then( reposonse => {
        this.$notify({
          title: 'Success',
          type: 'success',
          text: `<strong>${this.product.name}</strong> was deleted.`,
        });
        this.$router.push('/products');
      });
    },
    chooseFiles: function() {
      document.getElementById("productImage").click();
    },
    deleteImage: function() {
      this.$http.delete(`${this.$config.api_url}/images/${this.product.image}/`).then( response => {
        this.product.image = "";
      }, response => {
        this.imageDeleteError = true;
      });
    },
    saveProduct: function() {
      if (this.product.energy === '') {
        this.product.energy = null;
      }
      if (this.product.caffeine === '') {
        this.product.caffeine = null;
      }
      this.$http.patch(`${this.$config.api_url}/products/${this.product.id}/`, {
        name: this.product.name,
        price: TouchMate.stripComma(this.product.price),
        energy: this.product.energy,
        sugar: TouchMate.stripComma(this.product.sugar),
        caffeine: this.product.caffeine,
        alcohol: TouchMate.stripComma(this.product.alcohol),
        package_size: this.product.package_size,
      }).then(function(response) {

        this.$notify({
          type: 'success',
          title: 'Success',
          text: '<strong>' + this.product.name + '</strong> updated.',
          duration: 5000,
        });
      }, function(response) {
        console.log(response);
      });
    },
    updateProduct: function() {
      this.saveProduct();
    },
    saveImage: function() {
      const formData = new FormData();
      formData.append('image', this.image);
      this.$http.post(`${this.$config.api_url}/images/`, formData).then( response => {
        this.$http.patch(`${this.$config.api_url}/products/${this.product.id}/`, {
          image: response.body.id,
        }).then( response => {
          this.imageAddSuccess = true;
          this.product = response.body;
          if (this.serverinfo.decimal_separator != undefined) {
            this.product.price = TouchMate.decimalValue(this.product.price, this.serverinfo.decimal_separator);
            this.product.sugar = TouchMate.decimalValue(this.product.sugar, this.serverinfo.decimal_separator, 1);
            this.product.alcohol = TouchMate.decimalValue(this.product.alcohol, this.serverinfo.decimal_separator, 1);
          }
        }, response => {
          this.productError = true;
        });
      }, response => {
      })
    },
    loadProduct: function() {
      this.loading = true;
      this.$http.get(`${this.$config.api_url}/products/` + this.pid + '/').then(function(data) {
        this.product = data.body;
        this.productError = false;
        this.loading = false;
        if (this.serverinfo.decimal_separator != undefined) {
          this.product.price = TouchMate.decimalValue(this.product.price, this.serverinfo.decimal_separator);
          this.product.sugar = TouchMate.decimalValue(this.product.sugar, this.serverinfo.decimal_separator, 1);
          this.product.alcohol = TouchMate.decimalValue(this.product.alcohol, this.serverinfo.decimal_separator, 1);
        }
      }, function(data) {
        this.productStatus = data.status;
        this.productError = true;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.loadProduct();
  },
  watch: {
    serverinfo: function(newVal, oldVal) {
      if (this.product.price === parseInt(this.product.price, 10)) {
        this.product.price = TouchMate.decimalValue(this.product.price, this.serverinfo.decimal_separator);
      }
      if (this.product.sugar === parseInt(this.product.sugar, 10)) {
        this.product.sugar = TouchMate.decimalValue(this.product.sugar, this.serverinfo.decimal_separator, 1);
      }
      if (this.product.alcohol === parseInt(this.product.alcohol, 10)) {
        this.product.alcohol = TouchMate.decimalValue(this.product.alcohol, this.serverinfo.decimal_separator, 1);
      }
    }
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

  .tm-productImage img {
    max-height: 220px;
    width: auto;
    display: block;
  }

  .deleteImage {

  }
</style>
