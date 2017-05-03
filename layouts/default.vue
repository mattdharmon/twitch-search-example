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
  </div>
</template>

<style>
</style>
