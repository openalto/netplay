import $ from 'jquery'
const d3 = require('d3')

export default function (nodes, links, div) {
  this.nodes = nodes
  this.links = links
  this.div = div
  this.width = $(div).parent().width()
  this.height = $(window).height() - 75

  this.svg = d3.select(this.div).append('svg')
    .attr('width', this.width)
    .attr('height', this.height)

  var _this = this

  var color = d3.scaleOrdinal(d3.schemeCategory20)

  var simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function (d) { return d.id }))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(this.width / 2, this.height / 2))

  var link = this.svg.append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(this.links)
    .enter().append('line')
    .attr('stroke-width', function (d) { return Math.sqrt(d.value) })

  var node = this.svg.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(this.nodes)
    .enter().append('circle')
    .attr('r', 5)
    .attr('fill', function (d) { return color(d.group) })
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended))

  node.append('title')
    .text(function (d) { return d.id })

  simulation
    .nodes(this.nodes)
    .on('tick', ticked)

  simulation.force('link')
    .links(this.links)

  d3.select(window).on('resize', resize)

  function resize () {
    _this.width = $(_this.div).parent().width()
    _this.height = $(window).height() - 75

    $(_this.div)
      .attr('width', _this.width)
      .attr('height', _this.height)

    $(_this.div)
      .children()
      .attr('width', _this.width)
      .attr('height', _this.height)

    _this.svg
      .attr('width', _this.width)
      .attr('height', _this.height)

    _this.simulation
      .size([_this.width, _this.height])
      .resume()
  }

  function ticked () {
    link
      .attr('x1', function (d) { return d.source.x })
      .attr('y1', function (d) { return d.source.y })
      .attr('x2', function (d) { return d.target.x })
      .attr('y2', function (d) { return d.target.y })

    node
      .attr('cx', function (d) { return d.x })
      .attr('cy', function (d) { return d.y })
  }

  function dragstarted (d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged (d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  function dragended (d) {
    if (!d3.event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }
}
