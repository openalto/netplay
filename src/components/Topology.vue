<template>
  <div id="graph">
  </div>
</template>

<script>
import D3Force from './topo/charts'
import Global from './topo/global'
import Event from './topo/events'
const d3 = require('d3')

export default {
  name: 'topology',
  mounted: () => {
    window.$global = new Global()
    d3.json('static/data/test_odl_topo.json', (data) => {
      window.chart = new D3Force(data.nodes, data.links, '#graph')
      window.$events = new Event()
    })
  }
}
</script>

<style lang="stylus">
.links line
  stroke: #333
  stroke-opacity: 0.6

.nodes circle
  stroke: #fff
  stroke-width: 1.5px
</style>
