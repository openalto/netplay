<template>
  <main>
    <div id="graph"></div>
    <v-navigation-drawer
      temporary
      floating
      right
      height="50%"
      hide-overlay
      class="no-bg panel"
      :clipped="infoClipped"
      v-model="infoDrawer"
    >
      <component :is="panelType"></component>
    </v-navigation-drawer>
  </main>
</template>

<script>
import D3Force from './topo/charts'
import Global from './topo/global'
import Event from './topo/events'
import SwitchInfo from '@/components/panel/Switch'
const d3 = require('d3')

export default {
  name: 'topology',
  mounted () {
    var _this = this
    Object.assign(window.$global, new Global())
    d3.json('static/data/test_odl_topo.json', function (data) {
      window.chart = new D3Force(data.nodes, data.links, '#graph', _this)
      window.$events = new Event()
    })
    _this.$on('info-panel', function (draw) {
      _this.infoDrawer = draw.show
      if (draw.show) {
        d3.select('.panel').style('width', '100%')
      } else {
        d3.select('.panel').style('width', '0')
      }
      if (draw.type === 'switchInfo') {
        _this.showSwitchInfo()
      } else {
        _this.showDefault()
      }
    })
  },
  methods: {
    showSwitchInfo: function () {
      this.panelType = 'switchInfo'
    },
    showDefault: function () {
      this.panelType = 'default'
    }
  },
  components: {
    default: {
      template: '<div style="display: none">Default Panel Type. (You should never see it.)</div>'
    },
    SwitchInfo
  },
  data () {
    return {
      infoClipped: true,
      infoDrawer: false,
      panelType: 'default'
    }
  }
}
</script>

<style lang="stylus">
.link-link
  fill: none
  stroke-width: 2px

.host-link
  fill: none
  stroke-width: 2px

.port-link
  fill: none
  stroke: #CC9966
  stroke-width: 0px

.ten-ge-link
  stroke: #996633
  stroke-width: 2px

.forty-ge-link
  stroke: #9999FF
  stroke-width: 2.5px

.hundred-ge-link
  stroke: #CC6666
  stroke-width: 3.5px

.transparent-link
  fill: none
  stroke-width: 50px

.active-link
  stroke-dasharray: 100
  animation: dash 10s linear infinite

@keyframes dash
  to
    stroke-dashoffset: 1000

.switch-circle
  fill: #CCFFFF
  stroke: #99CCCC
  stroke-width: 3px

.ovs-circle
  fill: #B94431
  stroke: #B94431
  stroke-width: 3.5px

.port-circle
  stroke: #FFCC00
  stroke-width: 1.5px
  fill: #FFCC00

.mellanox-circle
  fill: url(#mellanox)

.arista-circle
  fill: url(#arista)

.dell-circle
  fill: url(#dell)

.pic-circle
  fill: url(#pica8)

.juniper-circle
  fill: url(#juniper)

.switch text,
.ovs text
  font-size: 16px

.port text
  font-size: 12px

.axis path,
.axis line
  fill: none
  stroke: #444
  shape-rendering: crispEdges

.y
  color: white

.line
  stroke: LightSkyBlue

.line2
  stroke: lightgreen

.area
  fill: steelblue
  opacity: 0.4

.main-flow-details
  border-left: 10px solid LightSkyBlue
  margin-left: 100px

.oposite-flow-details
  border-left: 10px solid lightgreen

.no-bg
  background-color: rgba(0,0,0,0)

.panel
  width: 100%
  top: auto
  bottom: 0
</style>
