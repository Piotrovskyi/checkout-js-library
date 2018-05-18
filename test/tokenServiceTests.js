const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

describe('Token service tests', function() {
  let client, pkClient;

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey });
    pkClient = new APIClient({ secretKey: testHelper.secretKey, publicKey: testHelper.publicKey });
  });

  it('CreatePaymentTokenTest', async function() {
    const payload = testHelper.getPaymentTokenCreateModel();
		const tokenResponse = await client.tokenService.createPaymentToken(payload);

    assert.equal(200, tokenResponse.status);
		assert.isNotNull(tokenResponse.data.id);
  });

  it('UpdatePaymentTokenTest', async function() {
    const tokenCreateResponse = await client.tokenService.createPaymentToken(testHelper.getPaymentTokenCreateModel());

		const payload= testHelper.getPaymentTokenUpdateModel();

		const tokenUpdateResponse = await client.tokenService.updatePaymentToken(tokenCreateResponse.data.id, payload);

		assert.equal(200, tokenUpdateResponse.status);
		assert.equal(tokenUpdateResponse.data.message,"ok");
  });

  it('CreateVisaCheckoutToken_WithoutBinData');
  // it('CreateVisaCheckoutToken_WithoutBinData', async function() {
  //   const payload = testHelper.getVisaCheckoutTokenCreateModel(false);
  //   const tokenResponse = await pkClient.tokenService.createVisaCheckoutToken(payload);

	// 	assert.equal(200,  tokenResponse.status);
	// 	assert.isNotNull(tokenResponse.data.id);
	// 	assert.isNull(tokenResponse.data.binData);
  // });
  it('CreateVisaCheckoutToken_WithBinData');
  // it('CreateVisaCheckoutToken_WithBinData', async function() {
  //   const payload = testHelper.getVisaCheckoutTokenCreateModel(true);
	// 	const tokenResponse = await pkClient.tokenService.createVisaCheckoutToken(payload);

	// 	assert.equal(200,  tokenResponse.status);
	// 	assert.isNotNull(tokenResponse.data.id);
	// 	assert.isNull(tokenResponse.data.binData);
  // });
});
