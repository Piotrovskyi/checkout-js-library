const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');
const AppSettings = require('../helpers/AppSettings');


class TokenService extends BaseService {
  createPaymentToken(payload) {
    return this.api.post(ApiUrls.paymentTokens(), payload);
  }

  createVisaCheckoutToken(payload) {
    return this.api.post(ApiUrls.visacheckoutTokens(), payload, AppSettings.publicKey);
  }

  updatePaymentToken(paymentToken, payload) {
    return this.api.put(ApiUrls.paymentToken(paymentToken), payload);
  }
}

module.exports = TokenService;
