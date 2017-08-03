const {defineSupportCode} = require('cucumber');
defineSupportCode(({Given, Then, When}) => {
	var proxy = require("proxy-tamper").start({port: 8080});
		proxy.tamper(/google/, function (request) {
			console.log(request);
			request.url = request.url.replace(/google/g, 'bing'); 
		}); 
const {client} = require('nightwatch-cucumber');

	Given(/^I open Google's search page$/, () => {

		return client
			.url('http://google.com')
			.waitForElementVisible('body', 1000)
			.pause(300000)
	});

	Then(/^the title is "([^"]*)"$/, (title) => {
		return client.assert.title(title);
	});

	Then(/^the Google search form exists$/, () => {
		return client.assert.visible('input[name="q"]');
	});

});