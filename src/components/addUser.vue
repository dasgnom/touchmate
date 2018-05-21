<template>
  <div>
    <h2 class="mb-4">Add User</h2>
    <form class="form" v-on:submit.prevent="saveUser">
      <div class="row">
        <div class="col-12">
          <b-form-group
            id="user_name_group"
            description="Enter your name"
            label="name"
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
</div>
</template>

<script>
export default {
  data () {
    return {
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
  methods: {
    saveUser: function() {
      if (this.user.name == undefined) {
        this.$notify({
          title: 'Error',
          text: 'Please choose a user name.',
          type: 'error',
        });
        return;
      }
      this.$http.post('//localhost:8080/v3/users/', {
        name: this.user.name,
        email: this.user.email,
        active: this.user.active,
        redirect: this.user.redirect,
        audit: this.user.audit,
      }).then(response => {
        this.$notify({
          type: 'success',
          text: 'User <strong>' + this.user.name + '</strong> created.',
          title: 'Success',
        });
        this.$router.push('/users/' + response.body.id + '/edit/');
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
    }
  }
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
