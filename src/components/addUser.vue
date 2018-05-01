<template>
  <div>
    <h2 class="mb-4">Add User</h2>
    <b-alert variant="danger" show v-show="resp.error">{{ resp.message }}</b-alert>
    <b-alert variant="success" show v-show="resp.success" dismissible @dismissed="resp.success=false">User {{user.name}} added</b-alert>
    <form class="form" v-on:submit.prevent="saveUser">
      <label>Username</label>
      <input class="form-control" placeholder="Username" type="text" required v-model="user.name" />
      <label>E-Mail</label>
      <input class="form-control" placeholder="Email" type="email" v-model="user.email" />
      <label>Active User</label>
      <input class="form-control" type="checkbox" v-model="user.active" value="true" />
      <label>Audit</label>
      <input class="form-control" type="checkbox" v-model="user.audit" value="true" />
      <label>Redirect</label>
      <input class="form-control" type="checkbox" v-model="user.redirect" value="true" />
      <button class="btn btn-primary" v-on:click.prevent="saveUser">Save User</button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      user: {},
      resp: {
        message: '',
        error: false,
        success: false,
      },
      submitted: false,
    }
  },
  methods: {
    saveUser: function() {
      if (this.user.name == undefined) {
        console.log('Bitte alles ausfuellen.');
        return;
      }
      this.$http.post('//localhost:8080/v3/users/', {
        name: this.user.name,
        email: this.user.email,
        active: true,
        redirect: true,
        audit: false,
      }).then(response => {
        console.log(response);
        console.log(response.status);
        this.resp.success = true;
      //  window.location = "/#/users/" + response.body.id;
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
