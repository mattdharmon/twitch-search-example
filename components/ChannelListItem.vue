<template>
  <div>
    <v-list-item :key="channel._id" @click="goToChannel(channel)">
      <v-list-tile avatar :href="channel.url">
        <v-list-tile-avatar>
          <img :src="channel.logo"/>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ channel.game }}</v-list-tile-title>
          <v-list-tile-sub-title v-html="channel.status"/>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>
    <v-divider inset/>
  </div>
</template>

<script>
export default {
  props: [
    'channel'
  ],
  methods: {
    goToChannel (channel) {
      location.href = channel.url
    }
  }
}
</script>
