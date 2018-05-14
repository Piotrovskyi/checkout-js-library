const client = require('axios');

class ApiHttpClient {
  constructor(baseUrl, apiKey, debug) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.debug = debug;
  }

  sendRequest(url, method = 'GET', payload, customKey) {
    const config = {
      url: `${this.baseUrl}/${url}`,
      headers: {
        'content-type': 'application/json',
        'Authorization': customKey || this.apiKey,
      },
    };

    if (payload) {
      config.data = payload;
    }

    if (method === 'POST' && !config.data) {
      config.data = {};
    }

    if (this.debug) {
      console.log('request data', config);
    }

    return client.request(config)
      .then(data => {
        if (this.debug) {
          console.log('response data', data);
        }
        return data;
      })
      .catch(err => {
        if (this.debug) {
          console.error('response error', err);
        }
        throw err;
      })
  }

  get(url, customKey) {
    return this.sendRequest(url, 'GET', null, customKey);
  }

  post(url, payload, customKey) {
    return this.sendRequest(url, 'POST', payload, customKey);
  }

  put(url, payload, customKey) {
    return this.sendRequest(url, 'PUT', payload, customKey);
  }

  delete(url, customKey) {
    return this.sendRequest(url, 'DELETE', null, customKey);
  }
}

module.exports = ApiHttpClient;
