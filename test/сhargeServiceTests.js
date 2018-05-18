const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

describe('Charge service tests', function() {
  let client;

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey });
  });

  it('Verify charge by payment token');
  // it('Verify charge by payment token', async function() {
  //   const payload = testHelper.getPaymentTokenCreateModel();
  //   const tokenResponse = await client.tokenService.createPaymentToken(payload);

  //   const chargeResponse = await client.chargeService.verifyCharge(tokenResponse.data.id);
  //   console.log(chargeResponse)
  //   assert.equal(200, chargeResponse.status);
  //   assert.isNotNull(chargeResponse.data.id);
  // });

  it('Charge with card token', async function() {
    const cardPayload = testHelper.getCardToken();
    const key = testHelper.publicKey;
    
    const {data} = await client.cardService.getCardToken(
      cardPayload,
      key
    );

  	const payload = testHelper.getCardTokenChargeModel(data.id);

    const chargeResponse = await client.chargeService.chargeWithCardToken(payload);
  	const charge = chargeResponse.data;
    assert.equal(200, chargeResponse.status);
  	assert.equal(payload.transactionIndicator,charge.transactionIndicator);

  });

  it('Create charge with nonm', async function() {
    const payload = testHelper.getCardChargeModel();

    const chargeResponse = await client.chargeService.chargeWithCard(payload);
    const charge = chargeResponse.data;

    assert.equal(200, chargeResponse.status);
    assert.equal(payload.transactionIndicator, charge.transactionIndicator);

    validateBaseCharge(payload, charge);
    validateCard(payload.card, charge.card);
  });

  it('Create charge with cardId', async function() {
    const customerResponse = await client.customerService.createCustomer(
      testHelper.getCustomerCreateModel(),
    );
    const cardId = customerResponse.data.cards.data[0].id;
    const customerEmail = customerResponse.data.email;

    const payload = testHelper.getCardIdChargeModel(cardId, customerEmail);

    const chargeResponse = await client.chargeService.chargeWithCardId(payload);
    const charge = chargeResponse.data;

    assert.equal(200, chargeResponse.status);
    assert.equal(payload.transactionIndicator, charge.transactionIndicator);

    validateBaseCharge(payload, charge);
  });

  it('Create charge with customer default card', async function() {
    const customerResponse = await client.customerService.createCustomer(
      testHelper.getCustomerCreateModel(),
    );
    const payload = testHelper.getDefaultCardChargeModel(customerResponse.data.email);
    const chargeResponse = await client.chargeService.chargeWithDefaultCustomerCard(
      payload,
    );
    const charge = chargeResponse.data;

    assert.equal(200, chargeResponse.status);
    assert.equal(payload.transactionIndicator, charge.transactionIndicator);

    validateBaseCharge(payload, charge);
  });

  it('Get charge', async function() {
    const payload = testHelper.getCardChargeModel();
    const createChargeResponse = await client.chargeService.chargeWithCard(payload);

    const chargeResponse = await client.chargeService.getCharge(
      createChargeResponse.data.id,
    );
    const charge = chargeResponse.data;

    assert.equal(200, chargeResponse.status);
    assert.equal(
      createChargeResponse.data.transactionIndicator,
      charge.transactionIndicator,
    );

    validateBaseCharge(payload, charge);
    validateCard(payload.card, charge.card);
  });

  it('Update charge', async function() {
    const createChargeResponse = await client.chargeService.chargeWithCard(
      testHelper.getCardChargeModel(),
    );
    const chargeResponse = await client.chargeService.updateCharge(
      createChargeResponse.data.id,
      testHelper.getChargeUpdateModel(),
    );

    assert.equal(200, chargeResponse.status);
    assert.equal(chargeResponse.data.message, 'ok');
  });

  it('Void charge', async function() {
    const createChargeResponse = await client.chargeService.chargeWithCard(
      testHelper.getCardChargeModel(),
    );

    const payload = testHelper.getChargeVoidModel();
    const voidResponse = await client.chargeService.voidCharge(
      createChargeResponse.data.id,
      payload,
    );

    assert.equal(200, voidResponse.status);
    assert.equal(voidResponse.data.status.toLowerCase(), 'voided');
    validateBaseChargeInfo(payload, voidResponse.data);
  });

  it('Capture charge with no parameters', async function() {
    const cardChargePayload = testHelper.getCardChargeModel();
    const createChargeResponse = await client.chargeService.chargeWithCard(
      cardChargePayload,
    );

    const captureResponse = await client.chargeService.captureCharge(
      createChargeResponse.data.id,
      null,
    );

    assert.equal(200, captureResponse.status);
    assert.equal(captureResponse.data.status.toLowerCase(), 'captured');
    validateBaseChargeInfo(cardChargePayload, captureResponse.data);
  });

  it('Capture charge with parameters', async function() {
    const createChargeResponse = await client.chargeService.chargeWithCard(
      testHelper.getCardChargeModel(),
    );

    const cardChargePayload = testHelper.getChargeCaptureModel();
    cardChargePayload.value = createChargeResponse.data.value;

    const captureResponse = await client.chargeService.captureCharge(
      createChargeResponse.data.id,
      cardChargePayload,
    );

    assert.equal(200, captureResponse.status);
    assert.equal(cardChargePayload.value, captureResponse.data.value);
    assert.equal(captureResponse.data.status.toLowerCase(), 'captured');
    validateBaseChargeInfo(cardChargePayload, captureResponse.data);
  });

  it('Refund charge with parameters', async function() {
    const createChargeResponse = await client.chargeService.chargeWithCard(
      testHelper.getCardChargeModel(),
    );
    const captureResponse = await client.chargeService.captureCharge(
      createChargeResponse.data.id,
      null,
    );

    const refundPayload = testHelper.getChargeRefundModel();
    const refundResponse = await client.chargeService.refundRequest(
      captureResponse.data.id,
      refundPayload,
    );

    assert.equal(200, refundResponse.status);
    assert.equal(refundResponse.data.status.toLowerCase(), 'refunded');
    validateBaseChargeInfo(refundPayload, refundResponse.data);
  });

  it('Create charge with card 3ds', async function() {
    const payload = testHelper.getCardChargeModel3ds();

    const chargeResponse = await client.chargeService.chargeWithCard(payload);
    const charge = chargeResponse.data;

    assert.equal(200, chargeResponse.status);

    validateBaseCharge3ds(payload, charge);
  });

  it('Create charge with card attempt N3d', async function() {
    const payload = testHelper.getCardChargeModelAttemptN3d();

    const chargeResponse = await client.chargeService.chargeWithCard(payload);
    const charge = chargeResponse.data;

    assert.equal(200, chargeResponse.status);

    validateBaseChargeAttemptN3d(payload, charge);
  });

  it('Get charge history', async function() {
    const createChargeResponse = await client.chargeService.chargeWithCard(
      testHelper.getCardChargeModel(),
    );

    const payload = testHelper.getChargeVoidModel();
    const voidResponse = await client.chargeService.voidCharge(
      createChargeResponse.data.id,
      payload,
    );

    const response = await client.chargeService.getChargeHistory(voidResponse.data.id);

    assert.isNotNull(response);
    assert.equal(200, response.status);
    assert.equal(response.data.charges.length, 2);

    assert.equal(response.data.charges[0].id, voidResponse.data.id);
    assert.equal(response.data.charges[1].id, createChargeResponse.data.id);
  });
  it('Get charge with multiple history', async function() {
    // charge
    const payload = testHelper.getCardChargeModel();
    const chargeResponse = await client.chargeService.chargeWithCard(payload);
    const charge = chargeResponse.data;

    // capture
    const chargeCaptureModel = testHelper.getChargeCaptureModel();
    const captureResponse = await client.chargeService.captureCharge(
      charge.id,
      chargeCaptureModel,
    );

    // refund
    const chargeRefundModel = testHelper.getChargeRefundModel();
    const refundResponse = await client.chargeService.refundRequest(
      captureResponse.data.id,
      chargeRefundModel,
    );

    const response = await client.chargeService.getChargeHistory(chargeResponse.data.id);

    assert.equal(200, chargeResponse.status);
    assert.equal(response.data.charges.length, 3);

    assert.equal(response.data.charges[0].id, refundResponse.data.id);
    assert.equal(response.data.charges[1].id, captureResponse.data.id);
    assert.equal(response.data.charges[2].id, chargeResponse.data.id);

    assert.equal(chargeResponse.data.id, captureResponse.data.originalId);
    assert.equal(refundResponse.data.originalId, captureResponse.data.id);
  });

  validateBaseCharge3ds = (payload, charge) => {
    assert.isNotNull(charge.id);
    assert.isNotNull(charge.redirectUrl);
    assert.equal(charge.responseCode, '10000');
    assert.equal(payload.chargeMode, charge.chargeMode);
  };
  validateBaseChargeAttemptN3d = (payload, charge) => {
    assert.isNotNull(charge.id);
    assert.isNotNull(charge.redirectUrl);
    assert.equal(charge.responseCode, '10000');
    assert.equal(charge.chargeMode, 1);
  };
  validateCard = (payload, chargeCard) => {
    assert.isNotNull(chargeCard.id);
    assert.isNotNull(chargeCard.customerId);
    assert.equal(chargeCard.paymentMethod.toLowerCase(), 'visa');
    assert.isNotNull(chargeCard.fingerprint);
    assert.isTrue(payload.number.endsWith(chargeCard.last4));
    assert.equal(payload.name, chargeCard.name);
    assert.equal(payload.expiryMonth, chargeCard.expiryMonth);
    assert.equal(payload.expiryYear, chargeCard.expiryYear);
    assert.equal(
      payload.billingDetails.addressLine1,
      chargeCard.billingDetails.addressLine1,
    );
    assert.equal(
      payload.billingDetails.addressLine2,
      chargeCard.billingDetails.addressLine2,
    );
    assert.equal(payload.billingDetails.city, chargeCard.billingDetails.city);
    assert.equal(payload.billingDetails.country, chargeCard.billingDetails.country);
    assert.equal(
      payload.billingDetails.phone.countryCode,
      chargeCard.billingDetails.phone.countryCode,
    );
    assert.equal(
      payload.billingDetails.phone.number,
      chargeCard.billingDetails.phone.number,
    );
    assert.equal(payload.billingDetails.postcode, chargeCard.billingDetails.postcode);
    assert.equal(payload.billingDetails.state, chargeCard.billingDetails.state);
  };
  validateBaseCharge = (payload, charge) => {
    assert.isNotNull(charge.id);
    assert.isNotNull(charge.created);
    assert.isNotNull(charge.status);
    assert.isNotNull(charge.metadata);
    assert.isNotNull(charge.products);
    assert.equal(charge.responseCode, '10000');
    assert.equal(payload.trackId, charge.trackId);
    assert.equal(payload.value, charge.value);
    assert.equal(payload.currency, charge.currency.toLowerCase());
    assert.equal(payload.description, charge.description);
    assert.equal(payload.email, charge.email);
    assert.equal(payload.chargeMode, charge.chargeMode); // TODO
    assert.equal(payload.customerIp, charge.customerIp);
    assert.equal(payload.autoCapture, charge.autoCapture);
    assert.equal(payload.autoCapTime, charge.autoCapTime);
    assert.equal(payload.udf1, charge.udf1);
    assert.equal(payload.udf2, charge.udf2);
    assert.equal(payload.udf3, charge.udf3);
    assert.equal(payload.udf4, charge.udf4);
    assert.equal(payload.udf5, charge.udf5);
  };
  validateBaseChargeInfo = (payload, charge) => {
    assert.isNotNull(charge.id);
    assert.isNotNull(charge.originalId);
    assert.isNotNull(charge.created);
    assert.isNotNull(charge.value);
    assert.isNotNull(charge.currency);
    assert.isNotNull(charge.metadata);
    assert.isNotNull(charge.products);
    assert.equal(charge.responseCode, '10000');
    assert.equal(payload.trackId, charge.trackId);
    assert.equal(payload.description, charge.description);
    assert.equal(payload.udf1, charge.udf1);
    assert.equal(payload.udf2, charge.udf2);
    assert.equal(payload.udf3, charge.udf3);
    assert.equal(payload.udf4, charge.udf4);
    assert.equal(payload.udf5, charge.udf5);
  };
});
