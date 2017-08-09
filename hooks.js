const {defineSupportCode} = require('cucumber');
const {client} = require('nightwatch-cucumber');
var proxy = require("proxy-tamper")

defineSupportCode(function({After, Before}) {
	Before(function () {
    var proxyPort = client.options.desiredCapabilities.proxy_port;
    client.proxy = proxy.start({port:proxyPort});
		return client.init();
	});
	After(function () {
    client.proxy.end();
		return client.end();
	});
});