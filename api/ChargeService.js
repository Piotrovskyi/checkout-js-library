const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');

class ChargeService extends BaseService {
  verifyCharge(paymentToken)  {
    return this.api.get(this.apiUrls.charge(paymentToken));
  }

  chargeWithCard(payload)  {
    return this.api.post(this.apiUrls.cardCharge(), payload);
  }

  chargeWithCardId(payload) {
    return this.api.post(this.apiUrls.cardCharge(), payload);
  }

  chargeWithCardToken(payload) {
    return this.api.post(this.apiUrls.cardTokenCharge(), payload);
  }

  chargeWithDefaultCustomerCard(payload) {
    return this.api.post(this.apiUrls.defaultCardCharge(), payload);
  }

  getCharge(chargeId) {
    return this.api.get(this.apiUrls.charge(chargeId));
  }

  updateCharge(chargeId, payload) {
      return this.api.put(this.apiUrls.charge(chargeId), payload);
  }

  voidCharge(chargeId, payload)  {
    return this.api.post(this.apiUrls.voidCharge(chargeId), payload);
  }

  captureCharge(chargeId, payload)  {
    return this.api.post(this.apiUrls.captureCharge(chargeId), payload);
  }

  refundRequest(chargeId, payload)  {
    return this.api.post(this.apiUrls.refundCharge(chargeId), payload);
  }

  getChargeHistory(chargeId)  {
    return this.api.get(this.apiUrls.chargeHistory(chargeId), payload);
  }
}

module.exports = ChargeService;
