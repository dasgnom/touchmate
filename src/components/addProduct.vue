<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h2 class="mb-4">Add Product</h2>
      </div>
    </div>

    <form class="form" v-on:submit.prevent="saveProduct">
      <div class="row">
        <div class="col-12">

          <b-alert variant="danger" show v-show="resp.error"><strong>An error occurred:</strong> {{ resp.message }}</b-alert>
            <b-form-group
              id="product_name_group"
              description="Enter the product name"
              label="product name"
              label-for="product_name"
            >
              <b-form-input id="product_name" v-model="product.name" required></b-form-input>
            </b-form-group>
          </div>
        </div>
      <div class="row">
        <div class="col-12">

          <b-form-group
            id="product_price_group"
            description="Enter the product price"
            label="product price"
            label-for="product_price"
          >
            <b-input-group>
              <b-input-group-text slot="prepend" v-if="serverinfo.currency_before">
                <span>{{ serverinfo.currency }}</span>
              </b-input-group-text>
              <b-form-input
                value="'1' + serverinfo.decimal_separator + '50'"
                pattern="[0-9]?[.,][0-9]+"
                v-model="product.price"
                required
              />
              <b-input-group-text slot="append" v-if="!serverinfo.currency_before">
                <span>{{ serverinfo.currency }}</span>
              </b-input-group-text>
            </b-input-group>
          </b-form-group>
        </div>
      </div>

      <div class="row">

      <div class="col-12 col-md-6">

        <b-form-group
          label="energy"
          description="Energy per 100g/ml"
          >
          <!--  TODO: Fix description to show server.energy -->
          <b-input-group>
              <b-form-input v-model="product.energy" id="product_energy"/>
              <b-input-group-text slot="append">
                <span>{{ serverinfo.energy }} per 100g/ml</span>
              </b-input-group-text>
          </b-input-group>
        </b-form-group>
      </div>

      <div class="col-12 col-md-6">
        <b-form-group
          label="sugar"
          description="Sugar in g per 100g/ml"
        >
        <b-input-group>
            <b-form-input
              id="product_sugar"
              v-model="product.sugar"
            />
            <b-input-group-text slot="append">
              <span>g per 100g/ml</span>
            </b-input-group-text>
        </b-input-group>
      </b-form-group>
      </div>
      </div>

      <div class="row">

      <div class="col-12 col-md-6">

        <b-form-group
          label="caffeine"
          description="Caffeine in mg per 100g/ml"
        >
        <b-input-group>
            <b-form-input v-model="product.caffeine" id="product_caffeine" />
            <b-input-group-text slot="append">
              <span>mg per 100g/ml</span>
            </b-input-group-text>
        </b-input-group>
        </b-form-group>
      </div>

      <div class="col-12 col-md-6">
        <b-form-group
          label="alcohol"
          description="alcohol by volume"
        >
        <b-input-group>
            <b-form-input
              id="product_alcohol"
              v-model="product.alcohol"
            />
            <b-input-group-text slot="append">
              <span>% by volume</span>
            </b-input-group-text>
        </b-input-group>
      </b-form-group>
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
      product: {
        price: "1.50"
      },
      resp: {
        message: '',
        error: false,
      },
      submitted: false,
      file: null,
      server: {},
    }
  },
  methods: {
    saveProduct: function(e) {
      console.log(this.product.price.replace(",", "").replace(".", ""));
      console.log(this.product.name);
      this.$http.post('//localhost:8080/v3/products/', {
        name: this.product.name,
        price: this.product.price.replace(",", "").replace(".", ""),
        energy: this.product.energy,
        sugar: this.product.sugar,
        caffeine: this.product.caffeine,
        alcohol: this.product.alcohol,
      }).then(response => {
        console.log("product posted");
        console.log(response);
        console.log(response.status);
        this.$router.push("/products/" + response.body.id);
      }, response => {
        console.log(response);
        if (response.status != 0) {
          this.resp.error = true;
          var message = response.body;
          this.resp.message = response.body.error;
        } else {
          this.resp.error = true;
          this.resp.message = "Unable to communicate with the server"
        }
      });
    }
  }
}
</script>

<style>

</style>
