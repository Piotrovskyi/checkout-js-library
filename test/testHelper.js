module.exports = {
  secretKey: 'sk_test_32b9cb39-1cd6-4f86-b750-7069a133667d',
  publicKey: 'pk_test_763e0a06-2eb2-4ac0-8099-65009064bded',
  getRandomEmail() {
    return this.getRandomString({ length: 10 }) + '@test.com';
  },
  getRandomString({ possible = 'abcdefghijklmnopqrstuvwxyz', length = 26 } = {}) {
    let text = '';

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },
  getRandomMetadata() {
    return {
      key1: this.getRandomString({ length: 20 }),
      key2: this.getRandomString({ length: 20 }),
    };
  },
  getRandomAddress() {
    const address = {};

    address.addressLine1 = this.getRandomString();
    address.addressLine2 = this.getRandomString();
    address.postcode = this.getRandomString({ length: 20 });
    address.country = 'US';
    address.city = this.getRandomString({ length: 15 });
    address.state = this.getRandomString();
    address.phone = this.getRandomPhone();
    return address;
  },
  getRandomProducts() {
    const product1 = {};
    product1.description = this.getRandomString({ length: 20 });
    product1.name = this.getRandomString({ length: 20 });
    product1.quantity = 1;
    product1.shippingCost = 10.5;
    product1.price = 10;
    product1.sku = this.getRandomString({ length: 25 });
    product1.trackingUrl = 'http://www.tracker.com';

    const product2 = {};
    product2.description = this.getRandomString({ length: 20 });
    product2.name = this.getRandomString({ length: 20 });
    product1.price = 10;
    product2.quantity = 1;
    product2.shippingCost = 20.2;
    product2.sku = this.getRandomString({ length: 25 });
    product2.trackingUrl = 'http://www.tracker.com';

    return [product1, product2];
  },
  getRandomPhone() {
    return {
      countryCode: '44',
      number: this.getRandomString({ possible: '1234567890', length: 10 }),
    };
  },
  getRandomNumber(max) {
    return Math.floor(Math.random() * max + 1);
  },
  getPaymentTokenCreateModel() {
    const tokenPayload = {};
    tokenPayload.value = this.getRandomNumber(1000);
    tokenPayload.currency = 'USD';
    tokenPayload.autoCapture = 'N';
    tokenPayload.customerIp = '88.216.3.135';
    tokenPayload.description = 'test';
    tokenPayload.metadata = this.getRandomMetadata();
    tokenPayload.products = this.getRandomProducts();
    tokenPayload.shippingDetails = this.getRandomAddress();
    return tokenPayload;
  },
  getPaymentTokenUpdateModel() {
    const tokenUpdatePayload = {};

    tokenUpdatePayload.trackId = 'TRK123456';
    tokenUpdatePayload.metadata = this.getRandomMetadata();
    tokenUpdatePayload.udf1 = this.getRandomString({ length: 20 });
    tokenUpdatePayload.udf2 = this.getRandomString({ length: 20 });
    tokenUpdatePayload.udf3 = this.getRandomString({ length: 20 });
    tokenUpdatePayload.udf4 = this.getRandomString({ length: 20 });
    tokenUpdatePayload.udf5 = this.getRandomString({ length: 20 });

    return tokenUpdatePayload;
  },
  getVisaCheckoutTokenCreateModel(includeBinData) {
		const tokenPayload = {};
		tokenPayload.callId = "3023957850660287501";
		tokenPayload.includeBinData = includeBinData;

		return tokenPayload;
	},
  getCardCreateModel() {
    const cardCreate = {};

    cardCreate.name = this.getRandomString();
    cardCreate.number = '4242424242424242';
    cardCreate.expiryMonth = '06';
    cardCreate.expiryYear = '2018';
    cardCreate.cvv = '100';
    cardCreate.billingDetails = this.getRandomAddress();

    return cardCreate;
  },
  getCardUpdateModel() {
    const cardUpdate = {};

    cardUpdate.name = this.getRandomString();
    cardUpdate.expiryMonth = '07';
    cardUpdate.expiryYear = '2018';
    cardUpdate.billingDetails = this.getRandomAddress();
    cardUpdate.defaultCard = true;

    return cardUpdate;
  },
  getCustomerCreateModel() {
    const customerCreate = this.getBaseCustomerModel();
    customerCreate.card = this.getCardCreateModel();

    return customerCreate;
  },
  getCustomerUpdateModel() {
    this.getBaseCustomerModel();
  },
  getBaseCustomerModel() {
    const customerPayload = {};
    customerPayload.name = this.getRandomString();
    customerPayload.description = this.getRandomString();
    customerPayload.email = this.getRandomEmail();
    customerPayload.phone = this.getRandomPhone();
    customerPayload.metadata = this.getRandomMetadata();

    return customerPayload;
  },
  getCardChargeModel() {
    const cardCharge = this.getBaseChargeModel();
    cardCharge.transactionIndicator = '1';
    cardCharge.chargeMode = '1';
    cardCharge.card = this.getCardCreateModel();

    return cardCharge;
  },
  getCardChargeModel3ds() {
    const cardCharge = this.getBaseChargeModel();
    cardCharge.transactionIndicator = '1';
    cardCharge.chargeMode = 2;
    cardCharge.card = this.getCardCreateModel();

    return cardCharge;
  },
  getCardChargeModelAttemptN3d() {
    const cardCharge = this.getBaseChargeModel();
    cardCharge.value = '100150'; // To trigger "Card not 3DS Enabled" https://docs.checkout.com/getting-started/testing-and-simulating-charges

    cardCharge.transactionIndicator = '1';
    cardCharge.chargeMode = 2;
    cardCharge.attemptN3D = true;
    cardCharge.card = this.getCardCreateModel();
    cardCharge.card.number = '378282246310005'; // We need to use a test card other than Visa, else normal 10000 response code will be returned
    cardCharge.card.expiryMonth = '06';
    cardCharge.card.expiryYear = '2018';
    cardCharge.card.cvv = '1000';

    return cardCharge;
  },
  getChargeUpdateModel() {
    const chargeUpdate = {};

    chargeUpdate.trackId = 'TRK123456';
    chargeUpdate.description = this.getRandomString({ length: 20 });
    chargeUpdate.metadata = this.getRandomMetadata();
    chargeUpdate.udf1 = this.getRandomString({ length: 20 });
    chargeUpdate.udf2 = this.getRandomString({ length: 20 });
    chargeUpdate.udf3 = this.getRandomString({ length: 20 });
    chargeUpdate.udf4 = this.getRandomString({ length: 20 });
    chargeUpdate.udf5 = this.getRandomString({ length: 20 });

    return chargeUpdate;
  },
  getChargeVoidModel() {
    const chargeVoid = this.getBaseChargeInfoModel();
    chargeVoid.products = this.getRandomProducts();
    return chargeVoid;
  },
  getChargeCaptureModel() {
    const chargeCapture = this.getBaseChargeInfoModel();
    chargeCapture.products = this.getRandomProducts();
    return chargeCapture;
  },
  getChargeRefundModel() {
    const chargeRefund = this.getBaseChargeInfoModel();
    chargeRefund.products = this.getRandomProducts();
    return chargeRefund;
  },
  getCardIdChargeModel(cardId, customerEmail) {
    const cardIdCharge = this.getBaseChargeModel();
    cardIdCharge.transactionIndicator = '1';
    cardIdCharge.cardId = cardId;
    cardIdCharge.email = customerEmail;
    cardIdCharge.chargeMode = '1';

    return cardIdCharge;
  },
  getCardTokenChargeModel(cardToken) {
    const cardTokenCharge = this.getBaseChargeModel();
    cardTokenCharge.transactionIndicator = '1';
    cardTokenCharge.cardToken = cardToken;
    return cardTokenCharge;
  },
  getDefaultCardChargeModel(email) {
    const defaultCardCharge = this.getBaseChargeModel();
    defaultCardCharge.transactionIndicator = '1';
    defaultCardCharge.email = email;
    defaultCardCharge.chargeMode = '1';

    return defaultCardCharge;
  },
  getBaseChargeModel() {
    const baseCharge = {};

    baseCharge.autoCapTime = 0;
    baseCharge.email = this.getRandomEmail();
    baseCharge.currency = 'usd';
    baseCharge.value = '100';
    baseCharge.autoCapture = 'N';
    baseCharge.trackId = 'TRK12345';
    baseCharge.customerIp = '82.23.168.254';
    baseCharge.customerName = 'Test Customer';
    baseCharge.description = this.getRandomString({ length: 20 });

    baseCharge.descriptor = {};
    baseCharge.descriptor.name = 'Amigo ltd.';
    baseCharge.descriptor.city = 'London';
    baseCharge.metadata = this.getRandomMetadata();
    baseCharge.products = this.getRandomProducts();
    baseCharge.shippingDetails = this.getRandomAddress();
    baseCharge.udf1 = this.getRandomString({ length: 20 });
    baseCharge.udf2 = this.getRandomString({ length: 20 });
    baseCharge.udf3 = this.getRandomString({ length: 20 });
    baseCharge.udf4 = this.getRandomString({ length: 20 });
    baseCharge.udf5 = this.getRandomString({ length: 20 });

    return baseCharge;
  },
  getBaseChargeInfoModel() {
    const baseChargeInfo = {};
    baseChargeInfo.trackId = 'TRK12345';
    baseChargeInfo.description = this.getRandomString({ length: 20 });
    baseChargeInfo.metadata = this.getRandomMetadata();
    baseChargeInfo.udf1 = this.getRandomString({ length: 20 });
    baseChargeInfo.udf2 = this.getRandomString({ length: 20 });
    baseChargeInfo.udf3 = this.getRandomString({ length: 20 });
    baseChargeInfo.udf4 = this.getRandomString({ length: 20 });
    baseChargeInfo.udf5 = this.getRandomString({ length: 20 });

    return baseChargeInfo;
  },
  getQueryTransactionModel(
    searchValue,
    fromDate,
    toDate,
    sortColumn,
    sortOrder,
    pageSize,
    pageNumber,
    filters,
  ) {
    const query = {};

    query.fromDate = fromDate;
    query.toDate = toDate;
    query.pageSize = pageSize;
    query.pageNumber = pageNumber;
    query.sortColumn = sortColumn;
    query.sortOrder = sortOrder;
    query.search = searchValue;
    query.filters = filters;

    return query;
  },
  getQueryChargebackModel(
    searchValue,
    fromDate,
    toDate,
    sortColumn,
    sortOrder,
    pageSize,
    pageNumber,
    filters,
  ) {
    const query = {};

    query.fromDate = fromDate;
    query.toDate = toDate;
    query.pageSize = pageSize;
    query.pageNumber = pageNumber;
    query.sortColumn = sortColumn;
    query.sortOrder = sortOrder;
    query.search = searchValue;
    query.filters = filters;

    return query;
  },
  getPayoutModel(cardId) {
    const basePayout = {};

    basePayout.destination = cardId;
    basePayout.value = 200;
    basePayout.currency = 'USD';
    basePayout.firstName = 'John';
    basePayout.lastName = 'Doe';

    return basePayout;
  },
  getCardToken() {
    return {
      name: this.getRandomString(),
      number: '4242424242424242',
      cvv: '100',
      expiryMonth: '06',
      expiryYear: '2018'
    }
  }
};
