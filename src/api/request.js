import axios from 'axios'
function req(method, url, params, data) {
  let p = new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      params: params,
      headers: { token: localStorage.getItem('token') },
      data: data,
    })
      .then(function(response) {
        if (response.data.errCode == 10000) {
          resolve(response.data)
        } else {
          reject(response.data)
        }
      })
      .catch(function(error) {
        reject(error)
      })
  })
  return p
}
export default {
  get: function(url, params) {
    return req('get', url, params, null)
  },
  post: function(url, data) {
    return req('post', url, null, data)
  },
}
