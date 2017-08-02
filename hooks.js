const {defineSupportCode} = require('cucumber');
const {client} = require('nightwatch-cucumber');
defineSupportCode(function({After, Before}) {
	Before(function () {
		return client.init();
	});
	After(function () {
		return client.end();
	});
});