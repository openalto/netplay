<template>
  <div id="graph">
  </div>
</template>

<script>
import D3Force from './topo/topo'
const d3 = require('d3')

export default {
  name: 'topology',
  mounted: () => {
    var _this = this
    d3.json('static/data/test_topo.json', (data) => {
      _this.chart = new D3Force(data.nodes, data.links, '#graph')
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
