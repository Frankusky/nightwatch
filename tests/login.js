module.exports = {
  'Login test': function (client) {
    client
      .url('http://google.com')
//      .setValue('input[name="email"]', 'foo@bar.com')
//      .setValue('input[name="password]', 'p455w0rdZ')
//      .click('button[type="submit"]')
//      .assert.containsText('main', 'News feed')
      .end();
  }
};