const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');

class ReportingService extends BaseService {
  queryTransaction(payload) {
    return this.api.post(ApiUrls.reportingTransactions(), payload);
  }

  queryChargeback(payload) {
    return this.api.post(ApiUrls.reportiongChargebacks(), payload);
  }
}

module.exports = ReportingService;
