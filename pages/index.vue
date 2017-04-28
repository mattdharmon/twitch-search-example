<template>
    <v-container>
      <v-row class="mt-3">
        <v-col sm11>
          <v-text-field v-model="searchTerm" label="Search..." hide-details></v-text-field>
        </v-col>
        <v-col sm1>
          <v-btn @click.native="search()" primary>Search</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm12>
          <v-list three-line  >
            <v-toolbar class="cyan">
              <v-toolbar-title>Search Results</v-toolbar-title>
            </v-toolbar>

            <!-- Display Channels -->
            <v-subheader v-if="hasChannels">Channels</v-subheader>
            <template v-if="hasChannels" v-for="channel in channels.slice(0, 3)">
              <v-list-item v-bind:key="channel.id">
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img v-bind:src="channel.logo"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="channel.game"/>
                    <v-list-tile-sub-title v-html="channel.status"/>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-item>
            </template>
          </v-list>

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
          <!-- </section> -->
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch ({ store, query }) {
    await store.dispatch('search', query.search)
  },
  data () {
    return {
      searchTerm: this.$store.state.search.term
    }
  },
  methods: {
    search () {
      // console.log('yay!')
      if (this.searchTerm) {
        this.$store.dispatch('search', this.searchTerm)
        this.$router.push({ query: { search: this.searchTerm } })
      }

      if (!this.searchTerm) {
        this.searchTerm = ''
        this.$router.push({ query: { } })
        this.$store.dispatch('resetSearchResults')
      }
    }
  },
  computed: {
    ...mapGetters({
      channels: 'channel/list',
      hasChannels: 'channel/hasResults'
    })
  }
}
</script>
