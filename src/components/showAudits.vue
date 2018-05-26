<template>
  <div>
    <h2 class="mb-4">Audits</h2>
    <b-row>
      <b-form class="col-12">
        <b-form-group horizontal
          label="Start date:"
          :label-cols="3"
          label-for="input-start-date"
          breakpoint="md"
          class="mb-0"
        >
          <datepicker
            monday-first
            input-class="form-control-sm"
            bootstrap-styling
            format="yyyy-MM-dd"
            v-model="startdate"
            id="input-start-date"
          ></datepicker>
        </b-form-group>
        <b-form-group horizontal
          label="End date:"
          label-for="input-end-date"
          :label-cols="3"
          class="mb-0"
        >
          <datepicker
            monday-first
            input-class="form-control-sm"
            bootstrap-styling
            format="yyyy-MM-dd"
            v-model="enddate"
            id="input-end-date"
          ></datepicker>
        </b-form-group>
        <b-button class="offset-3 btn-sm col-9" @click.prevent="getAudits">Filter</b-button>
      </b-form>
    </b-row>
    <dl>
      <dt>
        Audit sum:
      </dt>
      <dd>
        {{audits.sum | currency }}
      </dd>
      <dt>
        Payments sum:
      </dt>
      <dd>
        {{audits.payments_sum | currency }}
      </dd>
      <dt>
        Deposits sum:
      </dt>
      <dd>
        {{audits.deposits_sum | currency }}
      </dd>
    </dl>
    <table class="table table-dark table-sm">
      <thead>
        <tr>
          <th>
            Timestamp
          </th>
          <th>
            Amount
          </th>
          <th>
            Product
          </th>
        </tr>
        <tr v-for="audit in audits.audits" v-bind:class="{'bg-success': audit.action == 'deposit'}">
          <td>
            {{ audit.created_at }}
          </td>
          <td>
            <span v-if="audit.action !== 'deposit'">-</span>{{ audit.amount | currency }}
          </td>
          <td>
            <span v-if="audit.product_id">{{ audit.product_id }}</span>
            <span v-if="!audit.product_id" class="text-muted">n/a</span>
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
export default {
  components: {
    Datepicker,
  },
  data () {
    return {
      audits: {},
      startdate: this.moment().subtract(14, 'days').format(),
      enddate: this.moment().format(),
    }
  },
  methods: {
    getAudits: function() {
      this.$http.get(`${this.$config.api_url}/audits/?start=${this.moment(this.startdate).format()}&end=${this.moment(this.enddate).format()}`).then(response => {
        this.audits = response.body;
      }, response => {
        if (response.status != 0) {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: `An error occured while loading the audits. Please try again!<br />The error message was: ${response.body.error}`,
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
  },
  created() {
    this.getAudits();
  },
}
</script>

<style>


</style>
