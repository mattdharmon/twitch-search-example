<template lang="html">
    <v-container>
      <v-row class="mt-5">
        <v-col sm12 md10 class="text-sm-center">
          <v-text-field class="ma-0" @keyup.enter.native="searchAll" v-model="search.query" label="Search..." hide-details ></v-text-field>
        </v-col>
        <v-col sm12 md2>
          <v-btn class="ml-5" @click.native="searchAll" primary>Search</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="hasChannels">
        <v-col sm12>
          <v-list three-line  >
            <v-toolbar class="secondary">
              <v-toolbar-title>Channel Search Results</v-toolbar-title>
              <v-pagination :length.number="pagesLength" v-model="currentPage" @input="searchAll"/>
            </v-toolbar>

            <!-- Display Channels -->
            <ChannelListItem v-if="hasChannels" v-for="channel in channels" :channel="channel" :key="channel.id" />
          </v-list>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm12>
          <!-- Default display -->
          <div v-if="!hasChannels">
            <h1 class="title">
              NUXT
            </h1>
            <h2 class="subtitle">
              Universal Vue.js Application
            </h2>
            <div class="links">
              <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
              <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">Github</a>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ChannelListItem from '~components/ChannelListItem'

export default {
  async fetch ({ store, query }) {
    if (Object.keys(query)) {
      await store.dispatch('channel/search', query)
    }
  },
  data () {
    return {
      search: {
        ...this.$store.state.channel.search
      },
      currentPage: this.$store.state.channel.page,
      loading: false
    }
  },
  methods: {
    async searchAll () {
      this.$store.dispatch('channel/setPage', this.currentPage)
      this.search.offset = this.$store.state.channel.search.offset

      if (this.search.query) {
        await this.$store.dispatch('channel/search', this.search)
        this.$router.push({ name: 'channels', query: { ...this.search } })
      }

      if (!this.search.query) {
        this.search.query = ''
        this.$router.push({ query: { } })
        await this.$store.dispatch('resetSearchResults')
      }
    }
  },
  computed: {
    ...mapGetters({
      channels: 'channel/list',
      hasChannels: 'channel/hasResults',
      totalChannels: 'channel/total',
      pagesLength: 'channel/pagesLength'
    })
  },
  components: {
    ChannelListItem
  }
}
</script>

<style lang="css">
</style>
