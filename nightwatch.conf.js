require('nightwatch-cucumber')({
	cucumberArgs: ['--require', 'timeout.js', '--require', 'step_definitions', '--format', 'pretty', '--format', 'json:reports/cucumber.json', 'features']
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
	browserName: 'firefox',
	javascriptEnabled: true,
	acceptSslCerts: true
};

var CHROME_CONFIGURATION = {
	browserName: 'chrome',
	javascriptEnabled: true,
	acceptSslCerts: true,
	chromeOptions:{
		args: ["test-type","create-browser-on-startup-for-tests"]
	}
};

var EDGE_CONFIGURATION = {
	browserName: 'internet explorer',
	javascriptEnabled: true,
	acceptSslCerts: true
};

var DEFAULT_CONFIGURATION = {
	launch_url: 'http://localhost',
	selenium_port: 4444,
	selenium_host: 'localhost',
	desiredCapabilities: EDGE_CONFIGURATION
};

var ENVIRONMENTS = {
	default: DEFAULT_CONFIGURATION,
	chrome: CHROME_CONFIGURATION,
	firefox: FIREFOX_CONFIGURATION
};

module.exports = {
//	src_folders: ['tests'],
	selenium: SELENIUM_CONFIGURATION,
	test_settings: ENVIRONMENTS,
//	custom_assertions_path: ['custom-assertions'],
//	custom_commands_path: ['commands']
};
