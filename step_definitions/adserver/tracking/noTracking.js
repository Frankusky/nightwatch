const {defineSupportCode} = require('cucumber');
const {client} = require('nightwatch-cucumber');


defineSupportCode(({Given,Then,When}) => {
	Given(/^a user enters on a landing page with the parameter aw-track set to ([^"]*) on the query string$/, (queryStringValue) => {
		var baseUrl = "http://pre-cdn.awadserver.com/templates/13/fas-track.html?make=Tesla&model=Model-X&zipcode=90210";
		if (queryStringValue !== "nothing") {
			baseUrl = baseUrl + "&aw-track=" + queryStringValue
		}
		return client
			.timeoutsAsyncScript(5000)
			.url(baseUrl)
	});

	Then(/^the call to the ad server is performed$/, () => {
		return client
			.executeAsync(function (done) {
			/*TODO: move the following funtion to a command*/
			var tries = 0,
				intervalCheck = 0;
			intervalCheck = setInterval(function () {
				performance.getEntriesByType("resource").forEach(function (el) {
					if (el.name.indexOf("Ads/Listings") >= 0) {
						clearInterval(intervalCheck);
						done(true);
					} else if (tries === 5) {
						clearInterval(intervalCheck);
						done("not found")
					}
				})
				tries++;
			}, 1000);
		}, [], function (result) {
			client.assert.ok(result.value===true, "Test if the ad server call has been performed");
		})
	});

	Then(/^NoTracking value of the adserver call should be ([^"]*)$/, (expectedValue) => {
		return client
			.executeAsync(function (done) {
				performance.getEntriesByType("resource").forEach(function (el) {
					if (el.name.indexOf("Ads/Listings") >= 0) {
						done(el.name);
					} 
				})
		}, [], function (result) {
			if(expectedValue!=="nothing"){
				client.assert.ok(result.value.indexOf(",NoTracking:"+expectedValue) !== -1, "Test when aw-track parameter is not present");
			}else{
				client.assert.ok(result.value.indexOf(",NoTracking:") == -1, "Test when aw-track parameter is not present");
			}
		})
	});
});