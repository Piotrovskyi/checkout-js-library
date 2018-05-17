const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

describe('Charge service tests', function() {
  let client;

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey });
  });

  it('testCreatePaymentTokenRequest_InvalidCurrency', async function() {
    const tokenCreatePayload = {};
    tokenCreatePayload.value = '6';
    tokenCreatePayload.currency = 'kde';

    const error = await client.tokenService
      .createPaymentToken(tokenCreatePayload)
      .catch(err => err);

    assert.equal(true, error.response.data.message.includes('currency'));
    assert.isNotNull(error.response.data.eventId);
  });

  it('testCreatePaymentTokenRequest_ValidationError', async function() {
    const tokenCreatePayload = {};
    tokenCreatePayload.currency = 'usd';

    const error = await client.tokenService
      .createPaymentToken(tokenCreatePayload)
      .catch(err => err);

    assert.equal(true, error.response.data.errorCode.includes('70000'));
    assert.equal(true, error.response.data.message.includes('Validation'));
    assert.isNotNull(error.response.data.errors);
  });
});
