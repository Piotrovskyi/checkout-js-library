const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');
const UrlHelper = require('../helpers/UrlHelper');
const moment = require('moment');

class CustomerService extends BaseService {
  createCustomer(payload) {
    return this.api.post(ApiUrls.customers(), payload);
  }

  updateCustomer(customerId, payload) {
    let apiUrl = ApiUrls.customer(customerId);

    if (customerId.indexOf('@') > -1) {
      apiUrl = ApiUrls.customerEmail(customerId);
    }

    return this.api.put(apiUrl, payload);
  }

  getCustomer(customerId) {
    let apiUrl = ApiUrls.customer(customerId);

    if (customerId.indexOf('@') > -1) {
      apiUrl = ApiUrls.customerEmail(customerId);
    }

    return this.api.get(apiUrl);
  }

  getCustomerList(payload) {
    let apiUrl = ApiUrls.customers();

    if (payload && payload.count && payload.count > 0) {
      apiUrl = UrlHelper.addParameterToUrl(apiUrl, 'count', +payload.count);
    }

    if (payload && payload.offset && payload.offset > 0) {
      apiUrl = UrlHelper.addParameterToUrl(apiUrl, 'offset', +payload.offset);
    }

    if (payload && payload.fromDate) {
      apiUrl = UrlHelper.addParameterToUrl(
        apiUrl,
        'fromDate',
        moment.utc(payload.fromDate).format("YYYY-MM-DDTHH:mm:ss[Z]").toString()
      );
    }

    if (payload && payload.toDate) {
      apiUrl = UrlHelper.addParameterToUrl(
        apiUrl,
        'toDate',
        moment.utc(payload.toDate).format("YYYY-MM-DDTHH:mm:ss[Z]").toString()
      );
    }

    return this.api.get(apiUrl);
  }

  deleteCustomer(customerId) {
    return this.api.delete(ApiUrls.customer(customerId));
  }
}

module.exports = CustomerService;
