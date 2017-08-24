import $ from 'jquery'
import Handlebars from './handlebars.js'
import apis from 'apis'

$(function () {
  window['_tpl_compiled_local'] = []
  $('script[type="text/x-handlebars-template"]').each(function (i, item) {
    var tplId = $(item).attr('id')
    var source = $(item).html()
    var template = Handlebars.compile(source)
    window._tpl_compiled_local[tplId] = template
  })
  // 比较函数
  Handlebars.registerHelper('compare', function (left, operator, right, options) {
    if (arguments.length < 3) {
      throw new Error('Handlerbars Helper "compare" needs 2 parameters')
    }
    var operators = {
      '==': function (l, r) { return l === r },
      '===': function (l, r) { return l === r },
      '!=': function (l, r) { return l !== r },
      '!==': function (l, r) { return l !== r },
      '<': function (l, r) { return l < r },
      '>': function (l, r) { return l > r },
      '<=': function (l, r) { return l <= r },
      '>=': function (l, r) { return l >= r }
    }

    if (!operators[operator]) {
      throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator)
    }
    var result = operators[operator](left, right)
    if (result) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  })

  $.fn.extend({
    // localTpl(tplId, data, callback)
    tpl: function (tplId, data, callback) {
      var $this = $(this)
      var template = window._tpl_compiled_local[tplId]
      var html = template({data: data})
      $this.html(html)
      // callback(el, tplId, data, html)
      if (typeof callback === 'function') {
        callback($this, tplId, data, html)
      }
    },
    // localApiTpl(tplId, apiCode, params, callback)
    apiTpl: function (tplId, api, params, callback) {
      var $this = $(this)
      apis.request(api, params, function (data) {
        var template = window._tpl_compiled_local[tplId]
        var html = template({data: data})
        $this.html(html)
        // callback(el, tplId, data, html)
        if (typeof callback === 'function') {
          callback($this, tplId, data, html)
        }
      })
    }
  })
})
