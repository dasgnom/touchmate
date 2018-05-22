<template>
  <div id="show-users">
    <h2 class="mb-4">Users</h2>
    <div class="row">
      <div class="col-12 mb-3 text-center">
        <span><a class="btn" v-on:click="sterm=''">all</a></span>
        <span v-for="letter in searchletters"><a class="btn" v-bind:class="{ 'btn-secondary': letter === sterm }" v-on:click="sterm=letter">{{ letter }}</a>&nbsp;</span>
      </div>
    </div>
    <div class="row">
      <div class="col-4 col-sm-3 col-md-2 tm-item-container" v-for="user in filteredUsers" v-bind:key="user.id">
        <div class="tm-item" v-on:click="$router.push(`users/${user.id}`)">
          <b-img
            v-if="user.avatar"
            :src="$config.api_url + '/images/' + user.avatar + '/img/'"
            class="img-fluid" />
          <b-img
            v-if="!user.avatar && !$config.gravatar.use"
            class="img-fluid"
            src="/src/assets/img/user.png" />
          <b-img
            v-if="!user.avatar && $config.gravatar.use"
            src="/src/assets/img/user.png"
            :src="user.email | gravatar"
            class="img-fluid"
            onerror="this.src='/src/assets/img/user.png'" />
          <div class="name">
            {{ user.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      searchletters: ['#', 'abc', 'def', 'ghi','jkl', 'mno', 'pqr', 'stuv', 'wxyz'],
      sterm: '',
    }
  },
  methods: {},
  mounted() {
    this.$http.get(`${this.$config.api_url}users`).then(data => {
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
  },
  computed: {
    filteredUsers: function() {
      return this.users.filter((user) => {
        if (this.sterm === '#') {
          var regex = new RegExp('^[^a-z]', 'i');
        } else if (this.sterm === '') {
          var regex = new RegExp('^', 'i');
        } else {
          var regex = new RegExp('^[' + this.sterm + ']', 'i');
        }
        return user.name.match(regex);
      });
    }
  }
}
</script>
