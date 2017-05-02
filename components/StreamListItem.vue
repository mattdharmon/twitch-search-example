<template lang="html">
  <div>
    <v-list-item :key="stream._id">
      <v-list-tile avatar :href="stream.url">
        <v-list-tile-avatar>
          <img :src="stream.preview.small"/>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ stream.game }}</v-list-tile-title>
          <v-list-tile-sub-title v-html="stream.channel.name"/>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>
    <v-divider inset />
  </div>
</template>

<script>
export default {
  props: [
    'stream'
  ]
}
</script>

<style lang="css">
</style>
