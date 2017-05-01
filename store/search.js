export const state = {
  query: '',
  limit: 10,
  offset: 0
}

export const mutations = {
  setSearch (state, search) {
    state.query = search.query || ''
    state.limit = search.limit || 10
    state.offset = search.offset || 0
  }
}
