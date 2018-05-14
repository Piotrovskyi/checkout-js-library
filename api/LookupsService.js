const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');

class LookupsService extends BaseService {
  binLookup(bin) {
    return this.api.get(ApiUrls.binlookup(bin));
  }

  binLookupWithCardToken(token) {
    return this.api.get(ApiUrls.binlookupCardtoken(token));
  }
}

module.exports = LookupsService;
