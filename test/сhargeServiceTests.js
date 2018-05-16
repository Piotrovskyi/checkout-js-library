const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

describe('Charge service tests', function() {
  let client;

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey });
  });

  it('Verify charge by payment token', async function() {
    const paymentToken = 'pay_tok_4bf11f31-ae5f-4ac6-a942-2105f0f41860'; // set payment token for the JS charge

    const chargeResponse = await client.chargeService.verifyCharge(paymentToken);

    assert.equal(200, chargeResponse.status);
    assert.isNotNull(chargeResponse.data.id);
  });

  it('Charge with card token', async function() {
    const cardToken ="card_tok_220E97F3-4DA3-4F09-B7AE-C633D8D5E3E2";// set card token for charge

		const payload = testHelper.getCardTokenChargeModel(cardToken);

		const chargeResponse = await client.chargeService.chargeWithCardToken(payload);
		const charge = chargeResponse.data;

		assert.equal(200, chargeResponse.status);
		assert.equal(payload.transactionIndicator,charge.transactionIndicator);

		validateBaseCharge(payload, charge);
  });

  it('Create charge with card', async function() {
    const payload =testHelper.getCardChargeModel();

		const chargeResponse= await client.chargeService.chargeWithCard(payload);
		const charge = chargeResponse.data;

		assert.equal(200, chargeResponse.status);
		assert.equal(payload.transactionIndicator,charge.transactionIndicator);

		validateBaseCharge(payload, charge);
		validateCard(payload.card, charge.card);
  });
  it('Create charge with cardId');
  it('Create charge with customer default card');
  it('Get charge');
  it('Update charge');
  it('Void charge');
  it('Capture charge with no parameters');
  it('Capture charge with parameters');
  it('Refund charge with parameters');
  it('Create charge with card 3ds');
  it('Create charge with card attempt N3d');
  it('Get charge history');
  it('Get charge with multiple history');

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
    assert.equal(payload.chargeMode, charge.chargeMode);
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
