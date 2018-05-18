const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

const transactionSortColumn = {
  Date: 'Date',
  Id: 'Id',
  OriginId: 'OriginId',
  Name: 'Name',
  Email: 'Email',
  Status: 'Status',
  Type: 'Type',
  Amount: 'Amount',
  Scheme: 'Scheme',
  ResponseCode: 'ResponseCode',
  Currency: 'Currency',
  LiveMode: 'LiveMode',
  BusinessName: 'BusinessName',
  ChannelName: 'ChannelName',
  TrackId: 'TrackId'
}

describe('Reporting service tests', function() {
  let client;

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey });
  });

  it('queryTransaction_PageSizeShouldBeWithinLimits_Null');

  it('queryTransaction_PageSizeShouldBeWithinLimits_Bad');

  it('queryTransaction_PageSizeShouldBeWithinLimits_OK');

  it('queryTransaction_ShouldAllowPagination_Null');

  it('queryTransaction_ShouldAllowFilteringBySearchString_test');

  it('queryTransaction_ShouldAllowFilteringBySearchString_Captured');

  it('queryTransaction_ShouldAllowFilteringBySearchString_TRK12345');

  it('queryTransaction_ShouldAllowSorting_Id');

  it('queryTransaction_ShouldAllowSorting_OriginId');

  it('queryTransaction_ShouldAllowSorting_Email');

  it('queryTransaction_ShouldAllowSorting_Name');

  it('queryTransaction_ShouldAllowSorting_Type');

  it('queryTransaction_ShouldAllowSorting_Amount');

  it('queryTransaction_ShouldAllowSorting_Scheme');

  it('queryTransaction_ShouldAllowSorting_ResponseCode');

  it('queryTransaction_ShouldAllowSorting_Currency');

  it('queryTransaction_ShouldAllowSorting_LiveMode');

  it('queryTransaction_ShouldAllowSorting_BusinessName');

  it('queryTransaction_ShouldAllowSorting_ChannelName');

  it('queryTransaction_ShouldAllowSorting_TrackId');

  it('queryTransaction_ShouldAllowSortingOrder_Asc');

  it('queryTransaction_ShouldAllowSortingOrder_Desc');

  it('queryTransaction_ShouldAllowFilteringWithAction_Exclude');

  it('queryTransaction_ShouldAllowFilteringWithAction_Include');

  it('queryChargebacks_PageSizeShouldBeWithinLimits_Null');

  it('queryChargebacks_PageSizeShouldBeWithinLimits_OK');

  it('queryChargeback_ShouldAllowFilteringBySearchString_test');

  it('queryChargeback_ShouldAllowFilteringBySearchString_ADJM');

  it('queryChargeback_ShouldAllowSorting_Id');

  it('queryChargeback_ShouldAllowSorting_ChargeId');

  it('queryChargeback_ShouldAllowSorting_TrackId');

  it('queryChargeback_ShouldAllowSorting_Email');

  it('queryChargeback_ShouldAllowSorting_Name');

  it('queryChargeback_ShouldAllowSorting_Indicator');

  it('queryChargeback_ShouldAllowSorting_Amount');

  it('queryChargeback_ShouldAllowSorting_Currency');

  it('queryChargeback_ShouldAllowSorting_Scheme');

  it('queryChargeback_ShouldAllowSortingOrder_Asc');

  it('queryChargeback_ShouldAllowSortingOrder_Desc');

  it('queryChargeback_ShouldAllowFilteringWithAction_Exclude');

  it('queryChargeback_ShouldAllowFilteringWithAction_Include');
});
