<template>
  <div>
    <h2 class="mb-4">Statistics</h2>
    <b-alert variant="danger" show v-show="resp.error">{{ resp.message }}</b-alert>
    <dl>
      <dt>
        User count:
      </dt>
      <dd>
        {{stats.user_count}}
      </dd>
      <dt>
        Active users:
      </dt>
      <dd>
        {{stats.active_count}}
      </dd>
      <dt>
        Balance sum:
      </dt>
      <dd>
        {{ stats.balance_sum | currency }}
      </dd>
    </dl>
  </div>
</template>

<script>

export default {
  data () {
    return {
      stats: {},
      resp: {
        message: '',
        error: false,
        success: false,
      },
      submitted: false,
    }
  },
  created() {
    this.$http.get(`${this.$config.api_url}/users/stats/`).then(response => {
      this.stats = response.body;
    }, response => {
      if (response.status != 0) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'An error occured while loading the stats. Please try again! ' + this.response.body,
        });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'An error occured while loading the stats. Please try again!',
        });
      }
    });
  },
}
</script>

<style>

</style>
