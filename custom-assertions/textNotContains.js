/**
 * Checks if the given subtext is part of a text.
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.isSubtext(text, subtext, msg);
 *    };
 * ```
 *
 * @method attributeEquals
 * @param {string} text The original text
 * @param {string} subtext The subtext that you are searching for
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */
exports.assertion = function (text, subtext, msg) {
	/**
	 * The message which will be used in the test output and
	 * inside the XML reports
	 * @type {string}
	 */
	this.message = msg || "Testing if " + subtext + " is substring of " + text;

	/**
	 * A value to perform the assertion on. If a function is
	 * defined, its result will be used.
	 * @type {function|*}
	 */
	this.expected = function(){return text};

	/**
	 * The method which performs the actual assertion. It is
	 * called with the result of the value method as the argument.
	 * @type {function}
	 */
	this.pass = function (value) {
		return this.expected().indexOf(value)!=-1
	};

	this.failure = function (result) {
		var failed = result === false || result && result.status === -1;
		return failed;
	};
	/**
	 * The method which returns the value to be used on the
	 * assertion. It is called with the result of the command's
	 * callback as argument.
	 * @type {function}
	 */
	this.value = function (result) {
		return result
	};

	/**
	 * Performs a protocol command/action and its result is
	 * passed to the value method via the callback argument.
	 * @type {function}
	 */
	this.command = function (callback) {
		callback(text, subtext, msg); //resolves correctly but crashes flow	
		return this
	};
	return this
};
