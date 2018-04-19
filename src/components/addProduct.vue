<template>
  <div>
    <h2>Add Product</h2>
    <b-alert variant="danger" show v-show="resp.error">{{ resp.message }}</b-alert>
    <form class="form">
      <label>Name</label>
      <input class="form-control" placeholder="product name" type="text" required v-model="product.name" />
      <label>price</label>
      <input class="form-control" placeholder="price" type="number" v-model="product.price" />
      <button class="btn btn-primary" v-on:click="saveUser" prevent>Save User</button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      product: {},
      resp: {
        message: '',
        error: false,
      },
      submitted: false,
    }
  },
  methods: {
    saveUser: function() {
      if (this.product.name == undefined) {
        console.log('Bitte alles ausfuellen.');
        return;
      }
      this.$http.post('http://localhost:2342/v3/products/', {
        name: this.product.name,
        email: this.product.price,
      }).then(response => {
        console.log(response);
        console.log(response.status);
        window.location = "/#/products/" + response.body.id;
      }, response => {
        console.log(response);
        if (response.status != 0) {
          this.resp.error = true;
          var message = JSON.parse(response.bodyText);
          this.resp.message = JSON.parse(response.bodyText).error;
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
