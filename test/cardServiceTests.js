const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

describe('Card service tests', function() {
  let client, customerPayload, customerResponse, customerId;

  const validateCard = (payload, cardResponse) => {
    assert.isNotNull(cardResponse.id);
    assert.isTrue(payload.number.endsWith(cardResponse.last4)); // TODO
    assert.equal(customerId, cardResponse.customerId);
    assert.equal(payload.name, cardResponse.name);
    assert.equal(payload.expiryMonth, cardResponse.expiryMonth);
    assert.equal(payload.expiryYear, cardResponse.expiryYear);
    assert.equal(
      payload.billingDetails.addressLine1,
      cardResponse.billingDetails.addressLine1,
    );
    assert.equal(
      payload.billingDetails.addressLine2,
      cardResponse.billingDetails.addressLine2,
    );
    assert.equal(payload.billingDetails.city, cardResponse.billingDetails.city);
    assert.equal(payload.billingDetails.country, cardResponse.billingDetails.country);
    assert.equal(
      payload.billingDetails.phone.countryCode,
      cardResponse.billingDetails.phone.countryCode,
    );
    // assert.equal(
    //   payload.billingDetails.phone.number,
    //   cardResponse.billingDetails.phone.number,
    // );
    assert.equal(payload.billingDetails.postcode, cardResponse.billingDetails.postcode);
    assert.equal(payload.billingDetails.state, cardResponse.billingDetails.state);
    assert.equal(cardResponse.paymentMethod.toLowerCase(), 'visa');
    assert.isNotNull(cardResponse.fingerprint);
  };

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey });
    customerPayload = testHelper.getCustomerCreateModel();
    customerPayload.card = null;
    customerResponse = await client.customerService.createCustomer(customerPayload);
    customerId = customerResponse.data.id;
  });

  it('Create card', async function() {
    const payload = testHelper.getCardCreateModel();
    const cardResponse = await client.cardService.createCard(customerId, payload);

    assert.equal(200, cardResponse.status);
    assert.isNotNull(cardResponse.data.responseCode);
    validateCard(payload, cardResponse.data);
  });

  it('Update card', async function() {
    const cardCreateResponse = await client.cardService.createCard(
      customerId,
      testHelper.getCardCreateModel(),
    );
    const cardResponse = await client.cardService.updateCard(
      customerId,
      cardCreateResponse.data.id,
      testHelper.getCardUpdateModel(),
    );

    assert.equal(200, cardResponse.status);
    assert.equal(cardResponse.data.message, 'ok');
  });

  it('Get card', async function() {
    const cardCreatePayload = testHelper.getCardCreateModel();
    const cardCreateResponse = await client.cardService.createCard(
      customerId,
      cardCreatePayload,
    );

    const cardResponse = await client.cardService.getCard(
      customerId,
      cardCreateResponse.data.id,
    );

    assert.equal(200, cardResponse.status);
    validateCard(cardCreatePayload, cardResponse.data);
  });

  it('Get card list', async function() {
    const cardCreatePayload = testHelper.getCardCreateModel();

    const cardListResponse = await client.cardService.getCardList(customerId);

    assert.equal(200, cardListResponse.status);
    assert.equal(cardListResponse.data.count, 2);
  });

  it('Delete card', async function() {
    const cardCreatePayload = testHelper.getCardCreateModel();
    const cardCreateResponse = await client.cardService.createCard(
      customerId,
      cardCreatePayload,
    );

    const cardResponse = await client.cardService.deleteCard(
      customerId,
      cardCreateResponse.data.id,
    );

    assert.equal(200, cardResponse.status);
    assert.equal(cardResponse.data.message, 'ok');
  });

  it('Should get card token', async function() {
    const payload = testHelper.getCardToken();
    const key = testHelper.publicKey;
    
    const cardResponse = await client.cardService.getCardToken(
      payload,
      key
    );

    assert.equal(200, cardResponse.status);
    assert.equal(cardResponse.data.card.expiryMonth, payload.expiryMonth);
    assert.equal(cardResponse.data.card.expiryYear, payload.expiryYear);
  });
});
