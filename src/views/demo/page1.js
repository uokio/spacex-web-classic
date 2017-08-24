import './page1.scss'
import $ from 'jquery'
import apis from 'apis'
import demoApi from 'apis/demo'
import 'tools/template'

$(function () {
  $('body').append('<h1>hello world!你好------</h1>')
  apis.request(demoApi.test, {}, function (data) {
    console.log(data)
  })
  var context = {title: 'My New Post', body: 'This is my first post!'}
  $('#div_tpl').tpl('entry-template', context)
  $('#div_tpl_api').apiTpl('entry-template_api', demoApi.test, {})
})
