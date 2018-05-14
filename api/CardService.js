const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');

class CardService extends BaseService {
  createCard(customerId, payload) {
    return this.api.post(ApiUrls.cards(customerId), payload);
  }

  updateCard(customerId, cardId, payload) {
    return this.api.put(ApiUrls.card(customerId, cardId), payload);
  }

  getCard(customerId, cardId) {
    return this.api.get(ApiUrls.card(customerId, cardId));
  }

  getCardList(customerId) {
    return this.api.get(ApiUrls.cards(customerId));
  }

  deleteCard(customerId, cardId) {
    return this.api.delete(ApiUrls.card(customerId, cardId));
  }
}

module.exports = CardService;
