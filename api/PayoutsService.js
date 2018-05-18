const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');

class PayoutsService extends BaseService {
  createPayout(payload) {
		return this.api.post(ApiUrls.payouts(), payload);
	}
}

module.exports = PayoutsService;
