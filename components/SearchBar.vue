<template lang="html">
  <v-row class="mt-5">
    <v-col sm12 md10 class="text-sm-center">
      <v-text-field
        ref="input"
        :value="value"
        @input="updateValue($event)"
        @keyup.enter.native="search"
        class="ma-0 ml-3"
        label="Search..."
        hide-details />
    </v-col>
    <v-col sm12 md2>
      <v-btn
        class="ml-5"
        @click.native="search"
        primary>
          Search
        </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      term: this.value
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    },
    search () {
      this.$emit('search')
    }
  }
}
</script>

<style lang="css">
</style>
