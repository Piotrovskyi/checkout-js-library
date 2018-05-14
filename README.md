## Checkout.com API JavaScript Library

```javascript
const api = new ApiClient({
  secretKey: 'secret',
  privatKey: 'privat',
  env: 'LIVE', // 'SANDBOX'  // optional
  debugMode: true, // optional
})


// all following request return promise

api.tokenService.createPaymentToken(payload);
api.tokenService.createVisaCheckoutToken(payload);
api.tokenService.updatePaymentToken(payload);

api.chargeService.verifyCharge(paymentToken);
api.chargeService.chargeWithCard(payload);
api.chargeService.chargeWithCardId(payload);
api.chargeService.chargeWithCardToken(payload);
api.chargeService.chargeWithDefaultCustomerCard(payload);
api.chargeService.getCharge(chargeId);
api.chargeService.updateCharge(chargeId, payload);
api.chargeService.voidCharge(chargeId, payload);
api.chargeService.captureCharge(chargeId, payload);
api.chargeService.refundRequest(chargeId, payload);
api.chargeService.getChargeHistory(chargeId);


api.customerService.createCustomer(payload);
api.customerService.updateCustomer(customerId, payload);
api.customerService.getCustomer(customerId);
api.customerService.getCustomerList(payload);
api.customerService.deleteCustomer(customerId);

api.cardService.createCard(customerId, payload);
api.cardService.updateCard(customerId, cardId, payload);
api.cardService.getCard(customerId, cardId);
api.cardService.getCardList(customerId);
api.cardService.deleteCard(customerId, cardId);

api.reportingService.queryTransaction(payload);
api.reportingService.queryChargeback(payload);

api.lookupsService.binLookup(bin);
api.lookupsService.binLookupWithCardToken(token);

api.payoutsService.createPayout(payload);
```
