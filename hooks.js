const {defineSupportCode} = require('cucumber');
const {client} = require('nightwatch-cucumber');
var proxy = require("proxy-tamper")
var fs = require("fs");
defineSupportCode(function({After, Before,setDefaultTimeout}) {
	Before(function () {
    var proxyPort = client.options.desiredCapabilities.proxy_port;
    if(proxyPort!==undefined){
      client.proxy = proxy.start({port:proxyPort});
    }
		return client.init();
	});
	After(function () {
    if(client.proxy!== undefined){
      client.proxy.end();
    }
		return client.end();
	});
  setDefaultTimeout(30*1000);
});