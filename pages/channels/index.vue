<template lang="html">
    <v-container>
      <SearchBar v-model="search.query" @search="searchAll" />
      <v-row v-if="hasChannels">
        <v-col sm12>
          <v-list three-line  >
            <v-toolbar class="secondary">
              <v-toolbar-title>Channel Search Results</v-toolbar-title>
              <v-pagination
                :length.number="pagesLength"
                v-model="currentPage"
                @input="searchAll"/>
            </v-toolbar>

            <!-- Display Channels -->
            <ChannelListItem
              v-if="hasChannels"
              v-for="channel in channels"
              :channel="channel"
              :key="channel.id"/>
          </v-list>
        </v-col>
      </v-row>
      <NoSearchHolder v-if="!hasChannels"/>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import NoSearchHolder from '~components/NoSearchHolder'
import SearchBar from '~components/SearchBar'
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
      currentPage: this.$store.state.channel.page
    }
  },
  methods: {
    async searchAll () {
      this.$store.dispatch('channel/setPage', this.currentPage)
      this.search.offset = this.$store.state.channel.search.offset

      if (this.search.query) {
        await this.$store.dispatch('channel/search', this.search)
        this.$router.push({
          name: 'channels',
          query: { ...this.search }
        })
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
    SearchBar,
    NoSearchHolder,
    ChannelListItem
  }
}
</script>

<style lang="css">
</style>
