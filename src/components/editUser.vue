<template>
  <div>
    <h2 class="mb-4">Edit User <em>{{ user.name }}</em></h2>
    <div class="row">
    <form class="form col-md-8" v-on:submit.prevent="saveUser">
      <div class="row">
        <div class="col-12">
          <b-form-group
            id="user_name_group"
            description="Enter your User Name"
            label="user name"
            label-for="user_name"
          >
            <b-form-input id="user_name" v-model="user.name" required></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <b-form-group
            id="user_email_group"
            description="Enter your E-Mail address"
            label="email address"
            label-for="user_email"
          >
            <b-form-input id="user_email" v-model="user.email" required></b-form-input>
          </b-form-group>
        </div>
      </div>
  <div class="row mt-2">
    <div class="col-12">
      Active User
    </div>
    <div class="col-12">
      <div class="onoffswitch">
        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switch_active" v-model="user.active">
        <label class="onoffswitch-label" for="switch_active">
          <span class="onoffswitch-inner"></span>
          <span class="onoffswitch-switch"></span>
        </label>
      </div>
      <small>Defines whether a user is active or not (no effect, yet)</small>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col-12">
      Redirect
    </div>
    <div class="col-12">
      <div class="onoffswitch">
        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switch_redirect" v-model="user.redirect">
        <label class="onoffswitch-label" for="switch_redirect">
          <span class="onoffswitch-inner"></span>
          <span class="onoffswitch-switch"></span>
        </label>
      </div>
      <small>Redirect to the start page after any transaction (eg. recharge your account or buy something).</small>
    </div>
  </div>
  <div class="row mt-2 mb-3">
    <div class="col-12">
      Audits
    </div>
    <div class="col-12">
      <div class="onoffswitch">
        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="switch_audit" v-model="user.audit">
        <label class="onoffswitch-label" for="switch_audit">
          <span class="onoffswitch-inner"></span>
          <span class="onoffswitch-switch"></span>
        </label>
      </div>
      <small>Do you want your transactions being logged, along with your user name? If not, your transaction will be logged as anonymous.</small>
    </div>
  </div>
  <button class="btn btn-primary" v-on:click.prevent="saveUser">Save User</button>
</form>
<div class="col-md-4 text-center">
  <b-img
    v-if="user.avatar"
    :src="`${$config.api_url}/images/${user.avatar}/img/`"
    style="max-width:150px; max-height:150px;"
    class="img-fluid" />
  <b-img
    v-if="!user.avatar && !$config.gravatar.use"
    class="img-fluid"
    src="/src/assets/img/user.png"
    style="max-width:150px; max-height:150px;" />
  <b-img
    v-if="!user.avatar && $config.gravatar.use"
    src="/src/assets/img/user.png"
    :src="user.email | gravatar"
    class="img-fluid"
    style="max-width:150px; max-height:150px;"
    onerror="this.src='/src/assets/img/user.png'" />
  <button v-if="user.avatar && !this.$config.gravatar.use" class="btn btn-danger mt-3 mx-auto d-block" v-on:click.prevent.self="deleteImage()">Delete Picture</button>
  <div v-if="!user.avatar && !this.$config.gravatar.use" class="text-center">
    <b-form-file v-on:input="saveImage()" id="userAvatar" v-model="image" class="form-control invisible" style="opacity: 0.0;"></b-form-file>
    <button class="btn btn-secondary" v-on:click.prevent="chooseFiles()">add Avatar</button>
  </div>
</div>
</div>
<div class="row">
  <div class="col-12">
    <h2 class="text-danger mt-4 mb-3">Danger Zone</h2>
    <p class="text-danger">
      You can delete your user, with immediat effect. Once your account was delete it's
      impossible to restore it. <strong>Be careful!</strong>
    </p>
    <div>
      <b-btn v-b-modal.modal-delUser class="btn-danger">Delete User</b-btn>
      <b-modal
        id="modal-delUser"
        header-bg-variant="danger"
        header-text-variant="light"
        body-text-variant="danger"
        ok-variant="danger"
        ok-title="Delete!"
        cancel-varian="secondary"
        lazy
        @ok="deleteUser"
        centered title="Delete User?">
        <p class="my-4">Are you sure you wanna delete this user? This process can't be reverted.</p>
      </b-modal>
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
      id: this.$route.params.id,
      image: false,
      user: {
        redirect: true,
        active: true,
        checked: false,
      },
      resp: {
        message: '',
        error: false,
        success: false,
      },
      submitted: false,
    }
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    deleteUser: function(event) {
      this.$http.delete(`${this.$config.api_url}users/${this.user.id}/`).then( response => {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'User deleted',
        }, response => {
        });
        this.$router.push('/');
      });
    },
    deleteImage: function() {
      this.$http.delete(`${this.$config.api_url}images/${this.user.avatar}/`).then( response => {
        this.user.avatar = "";
      }, response => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'An error occured while deleting your avatar. Please try again. If the error persists, please contact your haxxor in charge.',
        })
      });
    },
    saveImage: function() {
      const formData = new FormData();
      formData.append('image', this.image);
      this.$http.post(`${this.$config.api_url}images/`, formData).then( response => {
        this.$http.patch(`${this.$config.api_url}users/${this.user.id}/`, {
          avatar: response.body.id,
        }).then( response => {
          this.user = response.body;
        }, response => {
        });
      }, response => {
      })
    },
    chooseFiles: function() {
      document.getElementById("userAvatar").click();
    },
    fetchUser: function(notification=false) {
      this.loading = true;
      this.$http.get(`${this.$config.api_url}users/${this.id}/`).then(
        data => {
          this.user = data.body;
          if (notification !== false) {
            this.$notify(notification);
          }
        },
        data => {
          this.$notify({
            type: 'error',
            text: 'Failed to load user from API.',
            title: 'Error',
          });
        }
      );
    },
    saveUser: function() {
      if (this.user.name == undefined) {
        this.$notify({
          title: 'Error',
          text: 'Please choose a user name.',
          type: 'error',
        });
        return;
      }
      this.$http.patch(`${this.$config.api_url}users/${this.id}/`, {
        name: this.user.name,
        email: this.user.email,
        active: this.user.active,
        redirect: this.user.redirect,
        audit: this.user.audit,
      }).then(response => {
        this.$notify({
          type: 'success',
          text: 'User <strong>' + this.user.name + '</strong> updated.',
          title: 'Success',
        });
      }, response => {
        if (response.status != 0) {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.body.error,
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Unable to communicate with the server',
          });
        }
      });
    },
  },
}
</script>

<style>
.onoffswitch {
  position: relative; width: 90px;
  -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
}
.onoffswitch-checkbox {
  display: none;
}
.onoffswitch-label {
  display: block; overflow: hidden; cursor: pointer;
  border: 2px solid #999999; border-radius: 5px;
}
.onoffswitch-inner {
  display: block; width: 200%; margin-left: -100%;
  transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
  display: block; float: left; width: 50%; height: 30px; padding: 0; line-height: 30px;
  font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
  box-sizing: border-box;
}
.onoffswitch-inner:before {
  content: "ON";
  padding-left: 8px;
  background-color: #17BD40; color: #FFFFFF;
}
.onoffswitch-inner:after {
  content: "OFF";
  padding-right: 8px;
  background-color: #D61515; color: #FFFFFF;
  text-align: right;
}
.onoffswitch-switch {
  display: block; width: 18px; margin: 6px;
  background: #FFFFFF;
  position: absolute; top: 0; bottom: 0;
  right: 56px;
  border: 2px solid #999999; border-radius: 5px;
  transition: all 0.3s ease-in 0s;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
  margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
  right: 0px;
}

</style>
