<template>
  <v-card :id="id" horizontal hover raised class="blue-grey panel-card">
    <v-list dense class="py-0">
      <v-list-item v-for="item in items" :key="item">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
// TODO: Migrate switch information panel
export default {
  name: 'switchInfo',
  data () {
    return {
      id: 'TBD',
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
.panel-card
  height: 100%
  opacity: 0.5
</style>
