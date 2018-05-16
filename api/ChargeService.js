const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');

class ChargeService extends BaseService {
  verifyCharge(paymentToken)  {
    return this.api.get(ApiUrls.charge(paymentToken));
  }

  chargeWithCard(payload)  {
    return this.api.post(ApiUrls.cardCharge(), payload);
  }

  chargeWithCardId(payload) {
    return this.api.post(ApiUrls.cardCharge(), payload);
  }

  chargeWithCardToken(payload) {
    return this.api.post(ApiUrls.cardTokenCharge(), payload);
  }

  chargeWithDefaultCustomerCard(payload) {
    return this.api.post(ApiUrls.defaultCardCharge(), payload);
  }

  getCharge(chargeId) {
    return this.api.get(ApiUrls.charge(chargeId));
  }

  updateCharge(chargeId, payload) {
      return this.api.put(ApiUrls.charge(chargeId), payload);
  }

  voidCharge(chargeId, payload)  {
    return this.api.post(ApiUrls.voidCharge(chargeId), payload);
  }

  captureCharge(chargeId, payload)  {
    return this.api.post(ApiUrls.captureCharge(chargeId), payload);
  }

  refundRequest(chargeId, payload)  {
    return this.api.post(ApiUrls.refundCharge(chargeId), payload);
  }

  getChargeHistory(chargeId)  {
    return this.api.get(ApiUrls.chargeHistory(chargeId), payload);
  }
}

module.exports = ChargeService;
