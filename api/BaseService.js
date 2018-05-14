const ApiHttpClient = require('../helpers/ApiHttpClient');
const AppSettings = require('../helpers/AppSettings');

class BaseService {
	constructor() {
		this.api = new ApiHttpClient(AppSettings.baseApiUrl, AppSettings.secretKey, AppSettings.debugMode);
	}
}

module.exports = BaseService;

