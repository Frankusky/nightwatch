require('nightwatch-cucumber')({
	cucumberArgs: ['--require', 'hooks.js','--require', 'step_definitions', '--format', 'json:reports/cucumber-{browser}.json', 'features']
})

var CLI_CONFIGURATION = {
	"webdriver.gecko.driver": "bin/geckodriver.exe",
	"webdriver.chrome.driver": "bin/chromedriver.exe",
	"webdriver.ie.driver": "bin/IEDriverServer.exe",
  "webdriver.firefox.profile" : "Nightwatch" // firefox profile needs to be installed manually, see https://github.com/nightwatchjs/nightwatch/issues/1543#issuecomment-320984137
  ,"ie.setProxyByServer":true
}
var SELENIUM_CONFIGURATION = {
	start_process: true,
	server_path: 'bin/selenium-server-standalone-3.4.0.jar',
	host: '127.0.0.1',
	port: {seleniumPort},
	cli_args: CLI_CONFIGURATION
};

var DEFAULT_CONFIGURATION = {
  launch_url: 'data:,',
  selenium_port: {seleniumPort},
  selenium_host: 'localhost',
  desiredCapabilities: {
    browserName: 'chrome',
    javascriptEnabled: true,
    acceptSslCerts: true
  }
}

var FIREFOX_CONFIGURATION = {
  "desiredCapabilities": {
    "browserName": "firefox",
    proxy_port:4562 //just to pass the port of the proxy so when the tests executes the proxy will know which proxy has to run in order to prevent conflicts proxy, this value is set in the firefox profile
//    "moz:firefoxOptions": { 
    // the following options doesnt works
//      "profile": "YmluL2ZpcmVmb3g=",
//      "binary": "C:/Program Files (x86)/Mozilla Firefox/firefox.exe",
//      "args": ["-p"]
//      "args": ["-profile", "bin/hfilsojg.nightwatchProfile"] //opens profile but gets stuck
//    }
  } 
};

var CHROME_CONFIGURATION = {
	desiredCapabilities: {
		browserName: 'chrome',
    proxy_port:6666,//just to pass the port of the proxy so iwhen the tests executes the proxy will know which proxy has to run in order to prevent conflicts proxy 
		chromeOptions: {
      args: [
//        "--user-data-dir=browser_profiles/chromeProfile/" //makes chrome use profile "
      ]
		},
    "proxy": {
      "proxyType": "manual",
      "httpProxy": "127.0.0.1:6666"
    }
	}
};

var IE_CONFIGURATION = {
	desiredCapabilities: {
    "ie.usePerProcessProxy":true,
		browserName: 'internet explorer',
    proxy_port:6969,//just to pass the port of the proxy so iwhen the tests executes the proxy will know which proxy has to run in order to prevent conflicts proxy 
    "proxy": {
      "proxyType": "manual",
      "httpProxy": "127.0.0.1:6969"
    }
	}
};

var ENVIRONMENTS = {
  default: DEFAULT_CONFIGURATION,
	chrome: CHROME_CONFIGURATION,
	firefox: FIREFOX_CONFIGURATION,
  "internet explorer": IE_CONFIGURATION
};

module.exports = {
	selenium: SELENIUM_CONFIGURATION,
	test_settings: ENVIRONMENTS,
	/*Optimizations Testing, nothing works :(*/
//			"globals_path": "nightwatch.global.js",
	//	custom_assertions_path: ['custom-assertions'],
	//	custom_commands_path: ['commands']
};
