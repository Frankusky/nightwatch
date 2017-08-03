require('nightwatch-cucumber')({
	cucumberArgs: ['--require', 'timeout.js','--require', 'hooks.js','--require', 'step_definitions', '--format', 'pretty', '--format', 'json:reports/cucumber.json', 'features']
})

var CLI_CONFIGURATION = {
	"webdriver.gecko.driver": "bin/geckodriver.exe",
	"webdriver.chrome.driver": "bin/chromedriver.exe",
	"webdriver.ie.driver": "bin/IEDriverServer.exe"
}
var SELENIUM_CONFIGURATION = {
	start_process: true,
	server_path: 'bin/selenium-server-standalone-3.4.0.jar',
	host: '127.0.0.1',
	port: 4444,
	cli_args: CLI_CONFIGURATION
};

var FIREFOX_CONFIGURATION = {
	launch_url: 'data:,',
	selenium_port: 4444,
	selenium_host: '127.0.0.1',
	desiredCapabilities: {
		browserName: 'firefox',
		javascriptEnabled: true,
		acceptSslCerts: true,
		marionette: true
	}
};

var CHROME_CONFIGURATION = {
	launch_url: 'data:,',
	selenium_port: 4444,
	selenium_host: 'localhost',
	desiredCapabilities: {
		browserName: 'chrome',
		javascriptEnabled: true,
		acceptSslCerts: true,
		chromeOptions: {
			args: ["test-type", "create-browser-on-startup-for-tests",'--proxy-server=127.0.0.1:8080']
		}
	}
};

var EDGE_CONFIGURATION = {
	launch_url: 'data:,',
	selenium_port: 4444,
	selenium_host: 'localhost',
	desiredCapabilities: {
		browserName: 'internet explorer',
		javascriptEnabled: true,
		acceptSslCerts: true
	}
};

var ENVIRONMENTS = {
	default: CHROME_CONFIGURATION,
	chrome: CHROME_CONFIGURATION,
	firefox: FIREFOX_CONFIGURATION,
	edge: EDGE_CONFIGURATION
};

module.exports = {
	selenium: SELENIUM_CONFIGURATION,
	test_settings: ENVIRONMENTS,
	/*Optimizations Testing, nothing works :(*/
	//		"globals_path": "nightwatch.global.js",
	//	custom_assertions_path: ['custom-assertions'],
	//	custom_commands_path: ['commands']
};
