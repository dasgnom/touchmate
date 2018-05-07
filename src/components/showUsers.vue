<template>
  <div id="show-users">
    <h2 class="mb-4">Users</h2>
    <div class="row">
      <div class="col-4 col-sm-3 col-md-2 tm-item-container" v-for="user in users" v-bind:key="user.id">
        <router-link :to="'users/' + user.id">
          <div class="tm-item">
            <img class="img-fluid" src="src/assets/img/user.png" />
            <div class="name">
              {{ user.name }}
            </div>
          </div>
        </router-link>
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
  mounted() {
    this.$http.get('http://localhost:8080/v3/users').then(data => {
      this.users = data.body;
    }, response => {
      this.$notify({
        type: 'error',
        title: 'Error',
        text: 'Unable to load user list from API. Please try again. If the \
               error persists, please contact your Haxxor in charge.',
        duration: -1,
      })
    });
  }
}
</script>
