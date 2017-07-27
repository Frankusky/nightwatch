module.exports = {
	'Login test': function (client) {
		client
			.url('http://cdn.awadserver.com/templates/13/fas-track.html?make=Tesla&model=Model-X&zipcode=90210')
			.perform(function (client, performDone) {
				client.executeAsync(function (done) {
					let tries = 0;
					setInterval(function () {
						performance.getEntriesByType("resource").find((el) => {
							if (el.name.indexOf("Ads/Listings") > 0) {
								console.log(el.name);
								setTimeout(function () {
									console.log("frank",client.assert)
									done();

								}, 1000)
							} else {
								if (tries === 5) {
									console.log("test");
									done()
								}
								tries++;
							}
						})
					}, 1000);
				}, [], function () {
					performDone();
				});
			})
//			.end();
	}
};
