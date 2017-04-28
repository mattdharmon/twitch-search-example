import axios from '~plugins/axios'

export const state = {
  searchTerm: '',
  list: [],
  total: 0,
  links: {}
}

export const mutations = {
  setList (state, channels) {
    state.list = channels
  },
  setTotal (state, total) {
    state.total = total
  },
  setSearchTerm (state, term) {
    state.searchTerm = term
  },
  setLinks (state, links) {
    state.links = links
  }
}

export const actions = {
  async search ({ commit, state }, term) {
    // Prevent double searches.
    if (state.searchTerm === term) {
      return
    }
    // Save the searchTerm for later
    commit('setSearchTerm', term)

    // Build the options for axios to communicate.
    const options = {
      params: {
        query: term
      }
    }

    // Get all the channels
    const channels = await axios.get('/search/channels', options)

    // Update the state.
    commit('setList', channels.data.channels)
    commit('setTotal', channels.data._total)
    commit('setLinks', channels.data._links)
  },
  clear ({ commit }) {
    commit('setList', [])
    commit('setTotal', 0)
    commit('setLinks', {})
  }
}

export const getters = {
  list (state) {
    return state.list
  },
  nextLink (state) {
    return state.links.next
  },
  hasResults (state) {
    return state.list.length > 0
  }
}
