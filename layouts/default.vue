<template>
  <div>
    <v-toolbar class="secondary">
      <v-toolbar-title>
        <nuxt-link :to="{name: 'index'}">
          Twitch Search Example
        </nuxt-link>
      </v-toolbar-title>
      <v-toolbar-items >
        <v-toolbar-item router nuxt :href="{ name: 'about' }">About</v-toolbar-item>
      </v-toolbar-items>
    </v-toolbar>
    <nuxt/>
    <v-footer class="secondary">

      <div class="text-xs-right">
        Icons, data, and pictures from <a href="https://twitch.tv">Twitch</a> belong to them.
        This is an example site to demonstrate nuxtjs and Twitch's search API.
      </div>
    </v-footer>
  </div>
</template>

<style>
</style>
