<template lang="html">
  <v-container>
      <v-row>
        <v-col sm12>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm12>
          <h4 class="headline">
            Nuxt.js project
          </h4>
          <p>
            There doesn't seem to be any results.
          </p>
          <p>
            Try entering a search in the search box or try searching for one of these:
            <ul>
              <li>
                <nuxt-link :to="{ name: 'index', query: { query: 'starcraft' } }">Starcraft</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{ name: 'index', query: { query: 'rocket legue' } }">Rocket Legue</nuxt-link>
              </li>
            </ul>
          </p>
          <p>
            For more information about this page, please visit the <nuxt-link :to="{ name: 'about' }">about</nuxt-link> page.
          </p>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
