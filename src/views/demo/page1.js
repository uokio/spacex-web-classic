import './page1.scss'
import $ from 'jquery'
import apis from 'apis'
import demoApi from 'apis/demo'

$(function () {
  $('body').append('<h1>hello world!你好------</h1>')
  apis.request(demoApi.test, {}, function (data) {
    console.log(data)
  })
})
