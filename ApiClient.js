const AppSettings = require('./helpers/AppSettings');

const TokenService = require('./api/TokenService');
const ChargeService = require('./api/ChargeService');
const CustomerService = require('./api/CustomerService');
const CardService = require('./api/CardService');
const ReportingService = require('./api/ReportingService');
const LookupsService = require('./api/LookupsService');
const PayoutsService = require('./api/PayoutsService');

const Environment = require('./helpers/Environment');


class ApiClient {
  constructor({ secretKey, env, debugMode, publicKey }) {
    AppSettings.secretKey = secretKey;
    AppSettings.setEnvironment(env || Environment.SANDBOX);
    AppSettings.debugMode = debugMode;
    AppSettings.publicKey = publicKey;

    this.setupServices();
  }

  setupServices() {
    this.tokenService = new TokenService();
    this.chargeService = new ChargeService();
    this.customerService = new CustomerService();
    this.cardService = new CardService();
    this.reportingService = new ReportingService();
    this.lookupsService = new LookupsService();
    this.payoutsService = new PayoutsService();
  }
}

module.exports = ApiClient;
