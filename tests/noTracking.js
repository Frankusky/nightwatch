"use strict";
module.exports = {
	'No Tracking Test': function (client) {
		client
			.url('http://pre-cdn.awadserver.com/templates/13/fas-track.html?make=Tesla&model=Model-X&zipcode=90210')
			.executeAsync(function (done) {
				/*TODO: move the following funtion to a command*/
				let tries = 0,
					intervalCheck = 0;
				intervalCheck = setInterval(function () {
					performance.getEntriesByType("resource").find((el) => {
						if (el.name.indexOf("Ads/Listings") >= 0) {
							clearInterval(intervalCheck);
							done(el.name);
						} else if (tries === 5) {
							done("not found")
						}
					})
					tries++;
				}, 1000);
			}, [], function (result) {
				client.assert.ok(result.value.indexOf(",NoTracking:") == -1, "Test when aw-track parameter is not present");
			})
			.url("http://pre-cdn.awadserver.com/templates/13/fas-track.html?make=Tesla&model=Model-X&zipcode=90210&aw-track=0")
			.executeAsync(function (done) {
				/*TODO: move the following funtion to a command*/
				let tries = 0,
					intervalCheck = 0;
				intervalCheck = setInterval(function () {
					performance.getEntriesByType("resource").find((el) => {
						if (el.name.indexOf("Ads/Listings") >= 0) {
							clearInterval(intervalCheck);
							done(el.name);
						} else if (tries === 5) {
							done("not found")
						}
					})
					tries++;
				}, 1000);
			}, [], function (result) {
				client.assert.ok(result.value.indexOf(",NoTracking:1") != -1, "Test when aw-track parameter is set to 0");
			})
			.url("http://pre-cdn.awadserver.com/templates/13/fas-track.html?make=Tesla&model=Model-X&zipcode=90210&aw-track=1")
			.executeAsync(function (done) {
				/*TODO: move the following funtion to a command*/
				let tries = 0,
					intervalCheck = 0;
				intervalCheck = setInterval(function () {
					performance.getEntriesByType("resource").find((el) => {
						if (el.name.indexOf("Ads/Listings") >= 0) {
							clearInterval(intervalCheck);
							done(el.name);
						} else if (tries === 5) {
							done("not found")
						}
					})
					tries++;
				}, 1000);
			}, [], function (result) {
				client.assert.ok(result.value.indexOf(",NoTracking:0") != -1, "Test when aw-track parameter is set to 1");
			})
			.end();
	}
};
