import $ from 'jquery'
const Cookies = require('js-cookie')
const d3 = require('d3')
const Handlebars = require('handlebars/dist/handlebars')

export default function () {
  this.toggle_task_timer = false
  this.lock_highlight = false
  this.task_management_timer = {}

  var _this = this

  this.getParameterByName = (name) => {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    var results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
  }

  this.show_msg = (msg, type, timeout) => {
    $('#alert').fadeTo(0, 500).slideDown(500, () => {
      var classes = 'navbar-fixed-bottom alert col-md-12 pull-right ' + type
      $('#alert').removeClass()
      $('#alert').addClass(classes)
      $('#alert').show()
      $('#alert').html(msg)
    })

    window.setTimeout(() => {
      $('#alert').fadeTo(500, 0).slideUp(500, () => {
        $('#alert').hide()
      })
    }, timeout)
  }

  this.clear_pannel_info = () => {
    // FIXME: it is inefficient
    $('#node-details').html('')
  }

  this.getTemplateAjax = (path, callback) => {
    var source
    var template

    $.ajax({
      url: '/static/templates/' + path,
      cache: false,
      success: (data) => {
        source = data
        template = Handlebars.compile(source)

        // execute the callback if passed
        if (callback) {
          callback(template)
        }
      }
    })
  }

  this.display_paths = (source, destination, paths) => {
    _this.lock_highlight = true
    $('nav').show()
    _this.clear_pannel_info()

    _this.getTemplateAjax('paths-details.handlebars', (template) => {
      var context = {source: source,
        destination: destination,
        paths: paths}
      $('#node-details').html(template(context))

      $('#path-details-table tbody tr').hover(() => {
        $(this).find('span').each(() => {
          var source = $(this).text().replace(/:/g, '\\:').replace(/\./g, '\\.')
          d3.selectAll('.link-' + source).attr('style', 'stroke: #FFF; stroke-width: 8px;')
        })
      }, () => {
        $(this).find('span').each(() => {
          var source = $(this).text().replace(/:/g, '\\:').replace(/\./g, '\\.')
          d3.selectAll('.link-' + source).attr('style', '')
        })
      })
    })
  }

  this.alto_path_manager = (paths) => {
    _this.lock_highlight = true
    $('nav').show()
    _this.clear_pannel_info()

    _this.getTemplateAjax('alto-route-management.handlebars', (template) => {
      // Test part
      // paths.push({path: ['src_host1', 'node1', 'node2', 'node3', 'node4', 'node5', 'dest_host2'], tc: 10000000})
      // paths.push({path: ['src_host0', 'node9', 'node8', 'node3', 'node4', 'node6', 'dest_host5']})
      // paths.push({path: ['src_host3', 'node7', 'node8', 'node3', 'node4', 'node6', 'dest_host4'], tc: 40000000})
      var context = {paths: paths}
      $('#node-details').html(template(context))

      $('#route-management-table tbody tr').hover(() => {
        var route = $(this).find('td:first a').data('route').split(',')
        route.slice(0, -1).forEach((e) => {
          var source = e.replace(/:/g, '\\:').replace(/\./g, '\\.')
          d3.selectAll('.link-' + source).attr('style', 'stroke: #FFF; stroke-width: 8px;')
        })
      }, () => {
        var route = $(this).find('td:first a').data('route').split(',')
        route.slice(0, -1).forEach((e) => {
          var source = e.replace(/:/g, '\\:').replace(/\./g, '\\.')
          d3.selectAll('.link-' + source).attr('style', '')
        })
      })

      $('.tc-update, .tc-create').click((e) => {
        // var spans = $(this).parent().prev().prev().children()
        // var source_ip = spans.first().text()
        // var destination_ip = spans.last().text()
        var modal = $('#SPCERateControllerModal')
        // var source = modal.find('#l3source').text(source_ip)
        // var destination = modal.find('#l3destination').text(destination_ip)
        if ($(this).attr('class').indexOf('update') > 0) {
          modal.find('#ALTORateControllerForm').attr('action', 'update')
        } else {
          modal.find('#ALTORateControllerForm').attr('action', 'create')
        }

        modal.modal()
      })
    })
  }

  this.alto_task_manager = (tasks) => {
    _this.lock_highlight = true
    $('nav').show()
    _this.clear_pannel_info()
    // TODO: dispay tasks stat
    _this.getTemplateAjax('alto-task-management.handlebars', (template) => {
      // Test part
      // tasks.push({id: 'i', source: '10.0.0.1:/volume/test1', destination: '10.0.0.2:/volume/test2', size: 10000, remain: 5000, speed: 100000, limit: 200000})
      // tasks.push({id: 'j', source: '10.0.0.3:/volume/test3', destination: '10.0.0.2:/volume/test4', size: 50000, remain: 1000, speed: 200000, limit: 200000})
      // tasks.push({id: 'k', source: '10.0.0.4:/volume/test5', destination: '10.0.0.3:/volume/test6', size: 100000, remain: 5000, speed: 100000, limit: 100000})

      var context = {tasks: tasks}
      $('#node-details').html(template(context))
    })
  }

  this.plot_flow = (cleanFlowId, tableId, nodeId) => {
    _this.clear_pannel_info()

    $.ajax({
      url: '/api/flow/' + nodeId + '/' + tableId + '/' + cleanFlowId,
      cache: false,
      headers: {
        'Authorization': 'Basic ' + (Cookies.get('auth') || '')
      },
      statusCode: {
        401: () => {
          window.location.href = '/login.html'
        }
      },
      success: (data) => {
        console.log(data)
      }
    })
  }

  Handlebars.registerHelper('len', (json) => {
    return Object.keys(json).length
  })
}
