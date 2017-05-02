import axios from '~plugins/axios'

export const state = {
  search: {
    query: '',
    limit: 10,
    offset: 0
  },
  list: [],
  total: 0,
  page: 1
}

export const mutations = {
  setList (state, channels) {
    state.list = channels
  },
  setTotal (state, total) {
    state.total = total
  },
  setSearch (state, search) {
    state.search.query = search.query || ''
    state.search.limit = parseInt(search.limit) || 10
    state.search.offset = parseInt(search.offset) || 0
  },
  setPage (state, page) {
    state.page = page
  }
}

export const actions = {
  async search ({ commit, state }, search) {
    if (search === state.search) {
      return
    }

    if (!search.query) {
      search = {
        query: '',
        limit: 10,
        offset: 0
      }
      commit('setTotal', 0)
      commit('setPage', 1)
      commit('setSearch', search)
      return
    }

    // Update the search state.
    commit('setSearch', search)

    // Build the options for axios to communicate.
    const options = {
      params: { ...state.search }
    }

    // Get all the streams
    const streams = await axios.get('/search/streams', options)

    // Update the state.
    commit('setList', streams.data.streams)
    commit('setTotal', streams.data._total)
    commit('setPage', (state.search.offset / state.search.limit) + 1)
  },
  clear ({ commit }) {
    commit('setList', [])
    commit('setTotal', 0)
    commit('setSearch', {})
  },
  setPage ({ commit, dispatch, state }, page) {
    const offset = (state.search.limit * (parseInt(page) - 1))
    commit('setSearch', { ...state.search, offset: offset })
    commit('setPage', page)
  }
}

export const getters = {
  list (state) {
    return state.list
  },
  total (state) {
    return state.total
  },
  hasResults (state) {
    return state.list.length > 0
  },
  pagesLength (state) {
    return Math.ceil(state.total / state.search.limit)
  },
  page (state) {
    return state.page
  }
}
