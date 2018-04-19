<template>
  <div id="show-users">
    <h2>Users</h2>
    <div class="row">
      <div class="col-2" v-for="user in users">
        <b-card
          img-src="src/assets/img/user.png"
          img-alt=user.name
          img-top
          style="max-width: 20rem;"
          class="mb-2">
          <p class="card-text">
            <router-link :to="'users/' + user.id">{{ user.name }}</router-link>
          </p>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      users: [],
    }
  },
  methods: {
  },
  created() {
    this.$http.get('http://localhost:2342/v3/users').then(function(data) {
      this.users = data.body;
      console.log(data);
    });
  }
}
</script>

<style>

</style>
