const {defineSupportCode} = require('cucumber');
const {client} = require('nightwatch-cucumber');
var proxy = require("proxy-tamper")
var fs = require("fs");
defineSupportCode(function({After, Before, AfterAll}) {
	Before(function () {
    var proxyPort = client.options.desiredCapabilities.proxy_port;
    client.proxy = proxy.start({port:proxyPort});
		return client.init();
	});
	After(function () {
    client.proxy.end();
		return client.end();
	});
  AfterAll(function(callback){
    var reporter = require('cucumber-html-reporter');
    var options = {
      theme: 'bootstrap',
      jsonFile: 'reports/cucumber.json',
      output: 'reports/html/cucumberReport.html',
      reportSuiteAsScenarios: false,
      launchReport: false
    };
    reporter.generate(options);
    callback();
  })
});