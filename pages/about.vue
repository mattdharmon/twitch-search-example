<template lang="html">
  <v-container>
      <v-row>
        <v-col sm12>
          <div>
            <h2 class="display-3">
              Twitch Search Sample
            </h2>
            <h4 class="headline">
              Nuxt.js project
            </h4>
            <p>
              I have chosen <a href="https://nuxtjs.org">Nuxt.js</a> for this project since it combines <a href="https://vuejs.org">Vue</a>, <a href="https://vuex.vuejs.org">Vuex</a>, and <a href="https://router.vuejs.org/en/">Vue Router</a> in a nice little framework. It also has Server Side Rendering built in as well without all the boilerplate, hot reloading on save, and webpack.
            </p>
            <p>
              Now go to <nuxt-link :to="{ name: 'index' }">localhost:3000</nuxt-link> for the default search or try searching for <nuxt-link :to="{ name: 'index', query: { query: 'starcraft' } }">Starcraft</nuxt-link> in the launched site.
            </p>
            <p>
              For detailed explanation on how things work, checkout the <a href="https://github.com/nuxt/nuxt.js">Nuxt.js docs</a>.
            </p>
          </div>
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
