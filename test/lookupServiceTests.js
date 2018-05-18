const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

describe('Lookup service tests', function() {
  let client;

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey });
  });

  it('binLookupWithCardToken')
  // it('binLookupWithCardToken', async function() {
  //   const cardToken ="card_tok_04426630-559B-4FB1-8355-823FDAC27CDB";// set card token for bin lookup

  //   const binLookupResponse = await client.lookupsService.binLookupWithCardToken(cardToken);
  //   const binLookup = binLookupResponse.data;

  //   assert.equal(200, binLookupResponse.status);
  //   assert.equal("454347", binLookup.bin);
  //   assert.equal("STATE BANK OF MAURITIUS, LTD.", binLookup.issuer);
  //   assert.equal("Mauritius", binLookup.issuerCountry);
  //   assert.equal("MU", binLookup.issuerCountryIso2);
  //   assert.equal("Visa", binLookup.scheme);
  //   assert.equal("Credit", binLookup.type);
  //   assert.equal("Consumer", binLookup.category);
  //   assert.equal("F", binLookup.productId);
  //   assert.equal("Visa Classic", binLookup.productType);
  // });

  it('binLookup', async function() {
    const binNumber="454347";// set bin

    const binLookupResponse = await client.lookupsService.binLookup(binNumber);
    const binLookup = binLookupResponse.data;

    assert.equal(200, binLookupResponse.status);
    assert.equal("454347", binLookup.bin);
    assert.equal("MU", binLookup.issuerCountryISO2);
    assert.equal("Mauritius", binLookup.countryName);
    assert.equal("STATE BANK OF MAURITIUS, LTD.", binLookup.bankName);
    assert.equal("Visa", binLookup.cardScheme);
    assert.equal("Credit", binLookup.cardType);
    assert.equal("Consumer", binLookup.cardCategory);
  });
});
