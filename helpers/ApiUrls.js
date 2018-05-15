const ApiUrls = {
	paymentTokens: () => `tokens/payment`,
	paymentToken: (paymentToken) => `tokens/payment/${paymentToken}`,
	visacheckoutTokens: () => `tokens/card/visa-checkout`,

	customers: () => `customers`,
	customer: (customerId) => `customers/${customerId}`,
	customerEmail: (customerId) => `customers?email=${customerId}`,

	cards: (customerId) => `customers/${customerId}/cards`,
	card: (customerId, cardId) => `customers/${customerId}/cards/${cardId}`,

	charges: () => `charges`,
	charge: (paymentToken) => `charges/${paymentToken}`,
	cardCharge: () => `charges/card`,
	defaultCardCharge: () => `charges/customer`,
	cardTokenCharge: () => `charges/token`,
	refundCharge: (chargeId) => `charges/${chargeId}/refund`,
	captureCharge: (chargeId) => `charges/${chargeId}/capture`,
	voidCharge: (chargeId) => `charges/${chargeId}/void`,
	chargeHistory: (chargeId) => `charges/${chargeId}/history`,

	reportingTransactions: () =>`reporting/transactions`,
	reportiongChargebacks: () => `reporting/chargebacks`,

	binlookup: (bin) => `lookups/bins/${bin}`,
	binlookupCardtoken: (token) => `tokens/${token}`,

	payouts: () => `payouts`,
	cardTokens: () => `tokens/card`
}

module.exports = ApiUrls;
