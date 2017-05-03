export const state = {
}

export const mutations = {
}

export const actions = {
  // Set up a global search.
  async search ({ commit, dispatch }, search) {
    commit('search/setSearch', search)
    await dispatch('channel/search', search)
    await dispatch('stream/search', search)
  },

  // Set up a global reset function.
  resetSearchResults ({ commit, dispatch }) {
    commit('search/setSearch', { })
    dispatch('channel/clear')
    dispatch('stream/clear')
  }
}
