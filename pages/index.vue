<template>
    <v-container>
      <v-row class="mt-3">
        <v-col sm11>
          <v-text-field @keyup.enter.native="searchAll()" v-model="search.query" label="Search..." hide-details></v-text-field>
        </v-col>
        <v-col sm1>
          <v-btn @click.native="searchAll()" primary>Search</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="hasChannels">
        <v-col sm12>
          <v-list three-line  >
            <v-toolbar class="secondary">
              <v-toolbar-title>Search Results</v-toolbar-title>
            </v-toolbar>

            <!-- Display Channels -->
            <v-subheader v-if="hasChannels">Channels</v-subheader>
            <ChannelListItem v-if="hasChannels" v-for="channel in channels.slice(0, 3)" :channel="channel" :key="channel._id" />
            <!-- link to more channel results -->
            <template v-if="hasChannels">
              <v-list-item >
                <v-list-tile avatar router nuxt :href="{ name: 'channels', query: search }">
                  <v-list-tile-avatar>
                    <v-icon>launch</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title >
                      See more channels
                    </v-list-tile-title>
                    <v-list-tile-sub-title>{{ totalChannels }} number of channels</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-item>
            </template>
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
    if (query.hasOwnProperty('query')) {
      await store.dispatch('search', query)
    }
  },
  data () {
    return {
      search: {
        ...this.$store.state.search
      }
    }
  },
  methods: {
    async searchAll () {
      if (this.search.hasOwnProperty('query')) {
        await this.$store.dispatch('search', this.search)
        this.$router.push({ query: { ...this.search } })
      }

      if (!this.search.hasOwnProperty('query')) {
        this.searchTerm = ''
        this.$router.push({ query: { } })
        this.$store.dispatch('resetSearchResults')
      }
    },
    goToChannelsList () {
      this.$router.push({ name: 'channels', query: { ...this.search } })
    }
  },
  computed: {
    ...mapGetters({
      channels: 'channel/list',
      hasChannels: 'channel/hasResults',
      totalChannels: 'channel/total'
    })
  },
  components: {
    ChannelListItem
  }
}
</script>
