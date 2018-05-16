const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

describe('Customer service tests', function() {
  let client;

  validateCustomerResponse = (payload, customerResponse) => {
    const cardResponse = customerResponse.cards.data[0];

    assert.isTrue(customerResponse.id.startsWith('cust_'));
    assert.equal(payload.email, customerResponse.email);
    assert.equal(payload.name, customerResponse.name);
    assert.equal(payload.description, customerResponse.description);
    assert.equal(payload.phone.countryCode, customerResponse.phone.countryCode);
    assert.equal(payload.phone.number, customerResponse.phone.number);
    assert.deepEqual(payload.metadata, customerResponse.metadata);
    assert.isNotNull(customerResponse.defaultCard);

    assert.equal(customerResponse.cards.count, 1);
    assert.isTrue(payload.card.number.endsWith(cardResponse.last4));
    assert.equal(cardResponse.paymentMethod, 'VISA');
    assert.isNotNull(cardResponse.fingerprint);
    assert.isNotNull(cardResponse.customerId);
    assert.equal(payload.card.name, cardResponse.name);
    assert.equal(payload.card.expiryMonth, cardResponse.expiryMonth);
    assert.equal(payload.card.expiryYear, cardResponse.expiryYear);
    assert.equal(
      payload.card.billingDetails.addressLine1,
      cardResponse.billingDetails.addressLine1,
    );
    assert.equal(
      payload.card.billingDetails.addressLine2,
      cardResponse.billingDetails.addressLine2,
    );
    assert.equal(payload.card.billingDetails.city, cardResponse.billingDetails.city);
    assert.equal(
      payload.card.billingDetails.country,
      cardResponse.billingDetails.country,
    );
    assert.equal(
      payload.card.billingDetails.phone.countryCode,
      cardResponse.billingDetails.phone.countryCode,
    );
    assert.equal(
      payload.card.billingDetails.phone.number,
      cardResponse.billingDetails.phone.number,
    );
    assert.equal(
      payload.card.billingDetails.postcode,
      cardResponse.billingDetails.postcode,
    );
    assert.equal(payload.card.billingDetails.state, cardResponse.billingDetails.state);
  };

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey });
  });

  it('Create customer', async function() {
    const customerCreatePayload = testHelper.getCustomerCreateModel();
    const customerResponse = await client.customerService.createCustomer(
      customerCreatePayload,
    );

    assert.equal(200, customerResponse.status);
    validateCustomerResponse(customerCreatePayload, customerResponse.data);
  });

  it('Update customer', async function() {
    const customerResponse = await client.customerService.createCustomer(
      testHelper.getCustomerCreateModel(),
    );
    const updateResponse = await client.customerService.updateCustomer(
      customerResponse.data.id,
      testHelper.getCustomerUpdateModel(),
    );

    assert.equal(200, updateResponse.status);
    assert.equal(updateResponse.data.message, 'ok');
  });

  it('Get customer request', async function() {
    const customerCreatePayload = testHelper.getCustomerCreateModel();
    const customerCreateResponse = await client.customerService.createCustomer(
      customerCreatePayload,
    );
    const customerResponse = await client.customerService.getCustomer(
      customerCreateResponse.data.id,
    );

    assert.equal(200, customerResponse.status);
    validateCustomerResponse(customerCreatePayload, customerResponse.data);
  });

  it('Get customer list request', async function() {
    const customerListRequest = {};
    customerListRequest.count = 2;
    customerListRequest.offset = 1;
    customerListRequest.fromDate = new Date(new Date().getTime() - 22000);

    const customerCreatePayload1 = testHelper.getCustomerCreateModel();
    const customerCreatePayload2 = testHelper.getCustomerCreateModel();

    const customerCreateResponse1 = await client.customerService.createCustomer(
			customerCreatePayload1,
		);
    const customerCreateResponse2 = await client.customerService.createCustomer(
			customerCreatePayload2,
		);
		customerListRequest.toDate = new Date(new Date().getTime() + 1 * 60000);

    const customerListResponse = await client.customerService.getCustomerList(
      customerListRequest,
    );

    assert.equal(200, customerListResponse.status);
    assert.equal(2, customerListResponse.data.count);

    // assert.equal(customerListResponse.data.data[0].id, customerCreateResponse2.data.id);
    // validateCustomerResponse(customerCreatePayload2, customerListResponse.data.data[0]);

    // assert.equal(customerListResponse.data.data[1].id, customerCreateResponse1.data.id);
    // validateCustomerResponse(customerCreatePayload1, customerListResponse.data.data[1]);
	});

	it('Get customer list request', async function() {
		const customerCreateResponse = await client.customerService.createCustomer(testHelper.getCustomerCreateModel());
		const deleteResponse = await client.customerService.deleteCustomer(customerCreateResponse.data.id);

		assert.equal(200, deleteResponse.status);
		assert.equal(deleteResponse.data.message,"ok");
	});
});
