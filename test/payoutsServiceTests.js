const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

describe('Payouts service tests', function() {
  let client;

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey });
  });

  it('createPayout', async function() {
    const customerResponse = await client.customerService.createCustomer(testHelper.getCustomerCreateModel());
    const cardId = customerResponse.data.cards.data[0].id;

    const payload = testHelper.getPayoutModel(cardId);

    const payoutResponse= await client.payoutsService.createPayout(payload);
    const payout = payoutResponse.data;

    assert.equal(200, payoutResponse.status);
    assert.equal("Authorised", payout.status);
    assert.equal("10000", payout.responseCode);
    assert.equal("Approved", payout.responseSummary);
    assert.equal("Approved", payout.responseDetails);
  });
})
