const Environment = require('./Environment');

class AppSettings {
  constructor() {
    this.clientVersion = 1.0;
    this.liveUrl = 'https://api2.checkout.com/v2';
    this.sandboxUrl = 'https://sandbox.checkout.com/api2/v2';
    this.baseApiUrl = '';
    this.secretKey; //"sk_test_32b9cb39-1cd6-4f86-b750-7069a133667d"
    this.publicKey; //"pk_test_2997d616-471e-48a5-ba86-c775ed3ac38a"
    this.debugMode = false;
    this.connectTimeout = 60;
    this.readTimeout = 60;
    this.clientUserAgentName = `Checkout-JavaLibraryClient/${this.clientVersion}`;
  }

  setEnvironment(env) {
    switch (env) {
      case Environment.LIVE:
        this.baseApiUrl = this.liveUrl;
        break;
      case Environment.SANDBOX:
        this.baseApiUrl = this.sandboxUrl;
        break;
    }
  }
}

module.exports = new AppSettings();
