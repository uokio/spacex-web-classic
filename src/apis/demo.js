export default {
  test: {
    path: '/demo.json',
    app: 'oauth2',
    method: 'get',
    dataType: 'json',
    contentType: 'application/json',
    timeout: 2000,
    mock: {
      enable: true,
      data: {
        name: 'demo1'
      }
    }
  },
  test2: {
    path: '/demo.json',
    app: 'ouath2',
    method: 'post',
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded',
    timeout: 2000,
    mock: {
      enable: false,
      data: {
        name: 'demo2'
      }
    }
  }
}
