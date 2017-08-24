const $ = require('jquery')

const apps = {
  ouath2: {
    name: '鉴权认证应用',
    description: '',
    baseUrl: 'http://127.0.0.1:8080/ouath2'
  }
}

export default {
  request: function (api, params, success, error) {
    if (api.mock != null && api.mock.enable === true) {
      console.log('mock data:' + api.path)
      if (success != null) {
        success(api.mock.data)
      }
      return
    }

    const app = apps[api.app]
    const url = app.baseUrl + api.path
    const data = params
    let dataType = 'json'
    let method = 'POST'
    let timeout = null
    let contentType = 'application/json'
    // var contentType = 'application/x-www-form-urlencoded'
    if (api.method != null || api.method !== undefined) {
      method = api.method
    }

    if (api.dataType != null || api.dataType !== undefined) {
      dataType = api.dataType
    }

    if (api.timeout != null || api.timeout !== undefined) {
      timeout = api.timeout
    }
    if (api.contentType != null || api.contentType !== undefined) {
      contentType = 'application/json'
    }
    return $.ajax({
      url: url,
      type: method,
      beforeSend: function (xhr) {
        console.log('api request starting')
      },
      data: data,
      timeout: timeout,
      success: success,
      dataType: dataType,
      contentType: contentType,
      error: error
    })
  }
}
