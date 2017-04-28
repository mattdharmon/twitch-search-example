export const state = {
}

export const mutations = {
}

export const actions = {
  // Set up a global search.
  async search ({ commit, dispatch }, term) {
    commit('search/setTerm', term)
    await dispatch('channel/search', term)
  },
  // Set up a global reset function.
  resetSearchResults ({ commit, dispatch }) {
    commit('search/setTerm', '')
    dispatch('channel/clear')
  }
}
