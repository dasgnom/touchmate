<template>
  <div id="show-product">
    <div v-show="loading" class="loading">
      <span class="mdi mdi-spin mdi-loading"></span>
    </div>
    <h2 class="mb-4">edit {{ product.name }}</h2>
    <b-alert
      v-if="productError"
      bg-variant="danger"
      text-variant="white"
      >
        <strong>Error:</strong> Unable to get the product from your space market API. Please try again. If the error
        persists, please contact the haxxor in charge!
    </b-alert>
    <b-alert
      :show="imageDeleteError"
      variant="danger"
      class="mb-4 mt-4"
      dismissible
      @dismissed="imageDeleteError=false"
      >
        <strong>Error:</strong> An error occured while deleting the image.
    </b-alert>
    <b-alert
      :show="updateSuccess"
      variant="success"
      class="mb-4 mt-4"
      dismissible
      @dismissed="updateSuccess=false"
    >
      Product updated
    </b-alert>
    <b-alert
      :show="imageAddSuccess"
      variant="success"
      class="mb-4 mt-4"
      dismissible
      @dismissed="imageAddSuccess=false"
    >
      Image added
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
                    pattern="[0-9]+[.,][0-9]+"
                    required
                    v-model="product.price"
                    v-bind:value="product.price"
                  />
                  <b-input-group-text slot="append" v-if="!serverinfo.currency_before">
                    <span class="text-white">{{ serverinfo.currency }}</span>
                  </b-input-group-text>
                </b-input-group>
              </b-form-group>
            </div>
          </div>
      </div>

    <div class="col-4 tm-productImage h-100 d-block">
      <img v-if="product.image" v-bind:src="'//localhost:8080/v3/images/' + product.image + '/img/'" class="img-fluid rounded col-9 mx-auto d-block">
      <button v-if="product.image" class="btn btn-danger mt-3 mx-auto d-block" v-on:click.prevent="deleteImage()">Delete Picture</button>
      <div v-if="!product.image" class="col-1 mx-auto d-block align-middle h-100 mt-4">
        <b-form-file v-on:input="saveImage()" id="productImage" v-model="image" class="form-control invisible" style="opacity: 0.0;"></b-form-file>
        <button v-if="!product.image" class="btn btn-secondary align-middle" v-on:click.prevent="chooseFiles()">Add Picture</button>
      </div>
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
      price: false,
      product: {},
      pid: this.$route.params.pid,
      productStatus: 0,
      productError: false,
      imageDeleteError: false,
      loading: true,
      server: {},
      image: null,
      updateSuccess: false,
      imageUpdateSuccess: false,
      imageAddSuccess: false,
    }
  },
  methods: {
    chooseFiles: function() {
      document.getElementById("productImage").click();
    },
    deleteImage: function() {
      console.log('Delete Image');
      console.log(this.product.image);
      this.$http.delete('//localhost:8080/v3/images/' + this.product.image + '/').then( response => {
        console.log('image ' +  this.product.image + ' deleted');
        this.product.image = "";
      }, response => {
        console.log(response);
        this.imageDeleteError = true;
      });
    },
    saveProduct: function() {
      this.$http.patch('//localhost:8080/v3/products/' + this.product.id.toString() + '/', {
        name: this.product.name,
        price: this.product.price.replace(",", "").replace(".", ""),
        energy: this.product.energy,
        sugar: this.product.sugar,
        caffeine: this.product.caffeine,
        alcohol: this.product.alcohol,
        image: this.product.image,
      }).then(function(response) {
        console.log(response);
        this.updateSuccess = true;
      }, function(response) {
        console.log(response);
      });
    },
    updateProduct: function() {
      console.log("updating product")
      this.saveProduct();
    },
    saveImage: function() {
      console.log('add image');
      const formData = new FormData();
      console.log(this.image);
      formData.append('image', this.image);
      this.$http.post('//localhost:8080/v3/images/', formData).then( response => {
        console.log(response);
        this.$http.patch('//localhost:8080/v3/products/' + this.product.id.toString() + '/', {
          image: response.body.id,
        }).then( response => {
          this.imageAddSuccess = true;
          this.product = response.body;
          console.log(response);
        }, response => {
          this.productError = true;
          console.log(response);
        });
      }, response => {
        console.log(response);
      })
    },
  },
  created() {
    this.loading = true;
    console.log(this.pid);
    this.$http.get('http://localhost:8080/v3/products/' + this.pid + '/').then(function(data) {
      this.product = data.body;
      this.product.price = data.body.price.toString().slice(0, -2) + this.serverinfo.decimal_separator + data.body.price.toString().substr(-2, 2);
      this.productError = false;
      this.loading = false;
    }, function(data) {
      this.productStatus = data.status;
      this.productError = true;
      this.loading = false;
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
