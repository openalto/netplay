<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile :to="item.to" value="true">
            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon light @click.native.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon light @click.native.stop="clipped = ! clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon light @click.native.stop="fixed = ! fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu bottom left origin="top right" transition="v-scale-transition">
          <v-btn light icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-item v-for="opt in options" :key="opt">
              <v-list-tile>
                <v-list-tile-title v-text="opt.title"></v-list-tile-title>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
    <v-footer :fixed="fixed">
      <span>SNLab.Org and Caltech &copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  created () {
    if (!window.$global) {
      window.$global = {}
    }
  },
  data () {
    return {
      miniVariant: false,
      clipped: false,
      drawer: true,
      items: [
        { icon: 'list', title: 'Topology', to: '/' },
        { icon: 'forward', title: 'L2 Route Calculation' },
        { icon: 'forward', title: 'L3 Route Calculation' },
        { icon: 'tune', title: 'L2/L3 Route Management' },
        { icon: 'list', title: 'All Interfaces' },
        { icon: 'list', title: 'All Flows' },
        { icon: 'list', title: 'All Hosts' },
        { icon: 'forward', title: 'ALTO Route Calculation' },
        { icon: 'tune', title: 'ALTO Route Management' }
      ],
      options: [
        { title: 'Dashboard' },
        { title: 'Sign In' },
        { title: 'Log Out' }
      ],
      fixed: false,
      title: 'NetPlay -- DevOps is like a game'
    }
  }
}
</script>

<style lang="stylus">
@import './stylus/main'

main
  background-color: rgba(0,0,0,1)
  color: white

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
</style>
