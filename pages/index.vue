<template>
    <v-container>
      <SearchBar v-model="search.query" @search="searchAll" />
      <v-row v-if="hasChannels">
        <v-col sm12>
          <v-list three-line  >
            <v-toolbar class="secondary">
              <v-toolbar-title>Search Results</v-toolbar-title>
            </v-toolbar>

            <!-- Display Channels -->
            <v-subheader v-if="hasChannels">Channels</v-subheader>
            <ChannelListItem
              v-if="hasChannels"
              v-for="channel in channels.slice(0, 3)"
              :channel="channel"
              :key="channel._id"/>
            <!-- link to more channel results -->
            <template v-if="hasChannels">
              <v-list-item >
                <v-list-tile
                  avatar
                  router
                  nuxt
                  :href="{ name: 'channels', query: search }">
                  <v-list-tile-avatar>
                    <v-icon>launch</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title >
                      See more channels
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{ totalChannels }} number of channels
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-item>
            </template>

            <!-- Display Streams -->
            <v-subheader v-if="hasStreams">Streams</v-subheader>
            <StreamListItem
              v-if="hasStreams"
              v-for="stream in streams.slice(0, 3)"
              :stream="stream"
              :key="stream._id"/>
            <!-- link to more stream results -->
            <template v-if="hasStreams">
              <v-list-item >
                <v-list-tile
                  avatar
                  router
                  nuxt
                  :href="{ name: 'streams', query: search }">
                  <v-list-tile-avatar>
                    <v-icon>launch</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title >
                      See more streams
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{ totalStreams }} number of streams
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-item>
            </template>
          </v-list>
        </v-col>
      </v-row>
      <NoSearchHolder v-if="!hasChannels && !hasStreams"/>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchBar from '~components/SearchBar'
import NoSearchHolder from '~components/NoSearchHolder'
import ChannelListItem from '~components/ChannelListItem'
import StreamListItem from '~components/StreamListItem'

export default {
  async fetch ({ store, query }) {
    if (query.hasOwnProperty('query')) {
      await store.dispatch('search', query)
    }

    if (!query.hasOwnProperty('query')) {
      await store.dispatch('resetSearchResults')
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
    async searchAll (term) {
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
      this.$router.push({
        name: 'channels',
        query: { ...this.search }
      })
    }
  },
  computed: {
    ...mapGetters({
      channels: 'channel/list',
      hasChannels: 'channel/hasResults',
      totalChannels: 'channel/total',
      streams: 'stream/list',
      hasStreams: 'stream/hasResults',
      totalStreams: 'stream/total'
    })
  },
  components: {
    SearchBar,
    NoSearchHolder,
    ChannelListItem,
    StreamListItem
  }
}
</script>
