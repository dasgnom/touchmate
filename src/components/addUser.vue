<template>
  <div>
    <h2 class="mb-4">Add User</h2>
    <b-alert variant="danger" show v-show="resp.error">{{ resp.message }}</b-alert>
    <form class="form">
      <label>Username</label>
      <input class="form-control" placeholder="Username" type="text" required v-model="user.username" />
      <label>E-Mail</label>
      <input class="form-control" placeholder="Email" type="email" v-model="user.email" />
      <label>Active User</label>
      <input class="form-control" type="checkbox" v-model="user.active" value="true" />
      <label>Audit</label>
      <input class="form-control" type="checkbox" v-model="user.audit" value="true" />
      <label>Redirect</label>
      <input class="form-control" type="checkbox" v-model="user.redirect" value="true" />
      <button class="btn btn-primary" v-on:click="saveUser" prevent>Save User</button>
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
      },
      submitted: false,
    }
  },
  methods: {
    saveUser: function() {
      if (this.user.username == undefined) {
        console.log('Bitte alles ausfuellen.');
        return;
      }
      this.$http.post('http://localhost:8080/v3/users/', {
        name: this.user.username,
        email: this.user.email,
        active: this.user.active,
        redirect: true,
        audit: false,
      }).then(response => {
        console.log(response);
        console.log(response.status);
        window.location = "/#/users/" + response.body.id;
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
